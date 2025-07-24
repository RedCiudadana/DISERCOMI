import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, FileText, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import Button from './Button';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: ChatOption[];
}

interface ChatOption {
  id: string;
  text: string;
  action: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when chatbot opens
      setTimeout(() => {
        addBotMessage(
          "¡Hola! 👋 Soy el asistente virtual de DISERCOMI. Estoy aquí para ayudarte con tus trámites y responder tus preguntas.",
          [
            { id: 'start-procedure', text: '🚀 Iniciar un trámite', action: 'start_procedure' },
            { id: 'track-procedure', text: '📋 Seguimiento de trámite', action: 'track_procedure' },
            { id: 'requirements', text: '📄 Requisitos de trámites', action: 'requirements' },
            { id: 'faq', text: '❓ Preguntas frecuentes', action: 'faq' },
            { id: 'contact', text: '📞 Información de contacto', action: 'contact' }
          ]
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, options?: ChatOption[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleOptionClick = (action: string, optionText: string) => {
    addUserMessage(optionText);
    
    simulateTyping(() => {
      switch (action) {
        case 'start_procedure':
          addBotMessage(
            "Para iniciar un trámite, necesitas seguir estos pasos:",
            [
              { id: 'decreto-29-89', text: '📋 Calificación Decreto 29-89', action: 'decreto_info' },
              { id: 'other-procedures', text: '📝 Otros trámites', action: 'other_procedures' },
              { id: 'requirements-general', text: '📄 Requisitos generales', action: 'general_requirements' },
              { id: 'back-main', text: '🔙 Volver al menú principal', action: 'main_menu' }
            ]
          );
          break;

        case 'decreto_info':
          addBotMessage(
            "📋 **Calificación para el Decreto 29-89**\n\n" +
            "**Documentos requeridos:**\n" +
            "• Solicitud oficial\n" +
            "• Informe técnico-económico\n" +
            "• RTU actualizado\n" +
            "• DPI del representante legal\n" +
            "• Planos de la empresa\n" +
            "• Listado arancelario\n\n" +
            "**Tiempo estimado:** 15-20 días hábiles\n" +
            "**Costo:** Q. 500.00",
            [
              { id: 'start-now', text: '🚀 Iniciar este trámite ahora', action: 'redirect_procedure' },
              { id: 'more-info', text: '📖 Más información', action: 'more_decreto_info' },
              { id: 'back-procedures', text: '🔙 Ver otros trámites', action: 'start_procedure' }
            ]
          );
          break;

        case 'track_procedure':
          addBotMessage(
            "Para dar seguimiento a tu trámite, puedes:\n\n" +
            "1. **Usar tu código de seguimiento** en nuestra página de seguimiento\n" +
            "2. **Iniciar sesión** en tu cuenta para ver todos tus trámites\n" +
            "3. **Llamar** a nuestras oficinas al +502 2412-0200\n\n" +
            "¿Tienes tu código de seguimiento?",
            [
              { id: 'have-code', text: '✅ Sí, tengo mi código', action: 'redirect_tracking' },
              { id: 'no-code', text: '❌ No tengo mi código', action: 'no_tracking_code' },
              { id: 'login-account', text: '👤 Iniciar sesión en mi cuenta', action: 'redirect_login' },
              { id: 'back-main', text: '🔙 Volver al menú principal', action: 'main_menu' }
            ]
          );
          break;

        case 'requirements':
          addBotMessage(
            "📄 **Requisitos generales para trámites DISERCOMI:**\n\n" +
            "**Documentos básicos:**\n" +
            "• Patente de Comercio vigente\n" +
            "• RTU actualizado\n" +
            "• DPI del representante legal\n" +
            "• Estados financieros\n" +
            "• Registro Mercantil\n\n" +
            "**Requisitos específicos varían según el trámite**",
            [
              { id: 'specific-requirements', text: '📋 Ver requisitos específicos', action: 'specific_requirements' },
              { id: 'document-formats', text: '📎 Formatos de documentos', action: 'document_formats' },
              { id: 'back-main', text: '🔙 Volver al menú principal', action: 'main_menu' }
            ]
          );
          break;

        case 'faq':
          addBotMessage(
            "❓ **Preguntas Frecuentes:**\n\n" +
            "Selecciona la pregunta que más te interese:",
            [
              { id: 'faq-time', text: '⏱️ ¿Cuánto tiempo toma un trámite?', action: 'faq_time' },
              { id: 'faq-cost', text: '💰 ¿Cuánto cuesta un trámite?', action: 'faq_cost' },
              { id: 'faq-documents', text: '📄 ¿Qué documentos necesito?', action: 'faq_documents' },
              { id: 'faq-status', text: '📊 ¿Cómo consulto el estado?', action: 'faq_status' },
              { id: 'faq-rejected', text: '❌ ¿Qué pasa si rechazan mi trámite?', action: 'faq_rejected' },
              { id: 'back-main', text: '🔙 Volver al menú principal', action: 'main_menu' }
            ]
          );
          break;

        case 'faq_time':
          addBotMessage(
            "⏱️ **Tiempos de procesamiento:**\n\n" +
            "• **Calificación Decreto 29-89:** 15-20 días hábiles\n" +
            "• **Prórroga de operaciones:** 10-15 días hábiles\n" +
            "• **Cambio de nombre:** 5-8 días hábiles\n" +
            "• **Registro de dirección:** 3-5 días hábiles\n\n" +
            "⚠️ Los tiempos pueden variar si falta documentación o hay observaciones.",
            [
              { id: 'more-faq', text: '❓ Otras preguntas frecuentes', action: 'faq' },
              { id: 'back-main', text: '🔙 Volver al menú principal', action: 'main_menu' }
            ]
          );
          break;

        case 'faq_cost':
          addBotMessage(
            "💰 **Costos de trámites:**\n\n" +
            "• **Calificación Decreto 29-89:** Q. 500.00\n" +
            "• **Prórroga de operaciones:** Q. 200.00\n" +
            "• **Cambio de nombre:** Q. 150.00\n" +
            "• **Registro de dirección:** Q. 50.00\n" +
            "• **Recalificación:** Q. 750.00\n\n" +
            "💳 Aceptamos pagos en línea y en nuestras oficinas.",
            [
              { id: 'payment-methods', text: '💳 Métodos de pago', action: 'payment_methods' },
              { id: 'more-faq', text: '❓ Otras preguntas frecuentes', action: 'faq' },
              { id: 'back-main', text: '🔙 Volver al menú principal', action: 'main_menu' }
            ]
          );
          break;

        case 'contact':
          addBotMessage(
            "📞 **Información de Contacto DISERCOMI:**\n\n" +
            "**Teléfono:** +502 2412-0200\n" +
            "**Email:** info@disercomi.gob.gt\n" +
            "**Dirección:** 7a. Avenida 7-61, Zona 4, Ciudad de Guatemala\n\n" +
            "**Horarios de atención:**\n" +
            "Lunes a Viernes: 8:00 AM - 4:30 PM\n\n" +
            "🌐 **Plataforma en línea:** Disponible 24/7",
            [
              { id: 'office-visit', text: '🏢 Información para visita presencial', action: 'office_info' },
              { id: 'online-support', text: '💻 Soporte en línea', action: 'online_support' },
              { id: 'back-main', text: '🔙 Volver al menú principal', action: 'main_menu' }
            ]
          );
          break;

        case 'redirect_procedure':
          addBotMessage(
            "🚀 Te voy a redirigir a la página para iniciar tu trámite. ¡Que tengas éxito con tu solicitud!",
            [
              { id: 'go-procedure', text: '➡️ Ir a iniciar trámite', action: 'external_procedure' }
            ]
          );
          break;

        case 'redirect_tracking':
          addBotMessage(
            "📋 Te voy a redirigir a la página de seguimiento donde podrás ingresar tu código.",
            [
              { id: 'go-tracking', text: '➡️ Ir a seguimiento', action: 'external_tracking' }
            ]
          );
          break;

        case 'main_menu':
          addBotMessage(
            "🏠 **Menú Principal**\n\n¿En qué puedo ayudarte hoy?",
            [
              { id: 'start-procedure', text: '🚀 Iniciar un trámite', action: 'start_procedure' },
              { id: 'track-procedure', text: '📋 Seguimiento de trámite', action: 'track_procedure' },
              { id: 'requirements', text: '📄 Requisitos de trámites', action: 'requirements' },
              { id: 'faq', text: '❓ Preguntas frecuentes', action: 'faq' },
              { id: 'contact', text: '📞 Información de contacto', action: 'contact' }
            ]
          );
          break;

        case 'external_procedure':
          window.open('/procedures/new', '_blank');
          addBotMessage("✅ Se ha abierto la página para iniciar tu trámite. ¿Hay algo más en lo que pueda ayudarte?");
          break;

        case 'external_tracking':
          window.open('/track', '_blank');
          addBotMessage("✅ Se ha abierto la página de seguimiento. ¿Hay algo más en lo que pueda ayudarte?");
          break;

        default:
          addBotMessage(
            "Lo siento, no entendí tu solicitud. ¿Podrías ser más específico o elegir una de las opciones disponibles?",
            [
              { id: 'back-main', text: '🔙 Volver al menú principal', action: 'main_menu' }
            ]
          );
      }
    });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    addUserMessage(inputText);
    const userInput = inputText.toLowerCase();
    setInputText('');

    simulateTyping(() => {
      // Simple keyword matching for user input
      if (userInput.includes('tramite') || userInput.includes('trámite') || userInput.includes('iniciar')) {
        handleOptionClick('start_procedure', inputText);
      } else if (userInput.includes('seguimiento') || userInput.includes('codigo') || userInput.includes('código')) {
        handleOptionClick('track_procedure', inputText);
      } else if (userInput.includes('requisito') || userInput.includes('documento')) {
        handleOptionClick('requirements', inputText);
      } else if (userInput.includes('contacto') || userInput.includes('telefono') || userInput.includes('teléfono')) {
        handleOptionClick('contact', inputText);
      } else if (userInput.includes('costo') || userInput.includes('precio') || userInput.includes('cuanto')) {
        handleOptionClick('faq_cost', inputText);
      } else if (userInput.includes('tiempo') || userInput.includes('demora') || userInput.includes('dias')) {
        handleOptionClick('faq_time', inputText);
      } else {
        addBotMessage(
          "Entiendo que necesitas ayuda. Te sugiero que uses las opciones del menú para obtener información más precisa:",
          [
            { id: 'start-procedure', text: '🚀 Iniciar un trámite', action: 'start_procedure' },
            { id: 'track-procedure', text: '📋 Seguimiento de trámite', action: 'track_procedure' },
            { id: 'requirements', text: '📄 Requisitos de trámites', action: 'requirements' },
            { id: 'faq', text: '❓ Preguntas frecuentes', action: 'faq' },
            { id: 'contact', text: '📞 Información de contacto', action: 'contact' }
          ]
        );
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-full shadow-large hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle size={24} className="transition-transform group-hover:scale-110" />
        
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-error-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-large border border-gray-200 z-50 flex flex-col animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-semibold">Asistente DISERCOMI</h3>
                <p className="text-xs text-blue-100">En línea • Respuesta inmediata</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm">{message.text}</div>
                  </div>
                  
                  {/* Options */}
                  {message.options && (
                    <div className="mt-2 space-y-1">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option.action, option.text)}
                          className="block w-full text-left p-2 text-xs bg-white border border-gray-200 rounded-lg hover:bg-primary-50 hover:border-primary-200 transition-colors"
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                
                {/* Avatar */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  message.isBot 
                    ? 'bg-primary-100 text-primary-600 order-1 mr-2' 
                    : 'bg-primary-500 text-white order-2 ml-2'
                }`}>
                  {message.isBot ? <Bot size={14} /> : <User size={14} />}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-semibold mr-2">
                  <Bot size={14} />
                </div>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-3 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Presiona Enter para enviar • Disponible 24/7
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;