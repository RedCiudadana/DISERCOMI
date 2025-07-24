/*
  # Create Bitácora (Audit Log) System

  1. New Tables
    - `bitacora_logs`
      - `id` (uuid, primary key)
      - `timestamp` (timestamptz, auto-generated)
      - `user_id` (uuid, references auth_users)
      - `user_name` (text)
      - `role` (text)
      - `action_type` (text)
      - `resource_type` (text)
      - `resource_id` (text)
      - `description` (text)
      - `changes` (jsonb, optional)
      - `ip_address` (text)
      - `device_info` (text)

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Create bitacora_logs table
CREATE TABLE IF NOT EXISTS bitacora_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth_users(id) ON DELETE SET NULL,
  user_name text NOT NULL,
  role text NOT NULL,
  action_type text NOT NULL,
  resource_type text NOT NULL,
  resource_id text,
  description text NOT NULL,
  changes jsonb,
  ip_address text,
  device_info text,
  created_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_action_type CHECK (
    action_type IN (
      'Login', 'Logout', 'View', 'Create', 'Update', 
      'Delete', 'State Change', 'Download', 'Error', 'Other'
    )
  ),
  
  CONSTRAINT valid_resource_type CHECK (
    resource_type IN (
      'Trámite', 'Expediente', 'Usuario', 'Documento', 'Sistema'
    )
  )
);

-- Enable RLS
ALTER TABLE bitacora_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can read all logs"
  ON bitacora_logs
  FOR SELECT
  TO authenticated
  USING (
    auth.role() IN ('admin', 'coordinator') OR 
    auth.uid() = user_id
  );

-- Create function to log actions
CREATE OR REPLACE FUNCTION log_action(
  p_user_id uuid,
  p_user_name text,
  p_role text,
  p_action_type text,
  p_resource_type text,
  p_resource_id text,
  p_description text,
  p_changes jsonb DEFAULT NULL,
  p_ip_address text DEFAULT NULL,
  p_device_info text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  v_log_id uuid;
BEGIN
  INSERT INTO bitacora_logs (
    user_id, user_name, role, action_type, resource_type,
    resource_id, description, changes, ip_address, device_info
  )
  VALUES (
    p_user_id, p_user_name, p_role, p_action_type, p_resource_type,
    p_resource_id, p_description, p_changes, p_ip_address, p_device_info
  )
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;