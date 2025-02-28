import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Plus, Paperclip, Users, BellOff, Bell, MinusCircle, X } from 'lucide-react';
import { Tooltip } from '../Tooltip';

interface ChatMessage {
  id: string;
  name: string;
  role: string;
  message: string;
  timestamp: string;
  isYou?: boolean;
}

const initialMessages: ChatMessage[] = [
  { 
    id: '1', 
    name: 'Sarah', 
    role: 'Worship Leader', 
    message: 'Starting rehearsal in 5', 
    timestamp: '9:15 AM' 
  },
  { 
    id: '2', 
    name: 'Mike', 
    role: 'Tech Director', 
    message: 'Audio levels look good', 
    timestamp: '9:18 AM' 
  },
  { 
    id: '3', 
    name: 'Anna', 
    role: 'Stage Manager', 
    message: 'Lighting cues updated', 
    timestamp: '9:22 AM' 
  }
];

const TeamChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message: ChatMessage = {
      id: String(Date.now()),
      name: 'You',
      role: 'Presentation Operator',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      isYou: true
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  // Toggle mute notifications
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Toggle chat collapse
  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Toggle users panel
  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };
  
  // Team members for the users panel
  const teamMembers = [
    { name: 'Sarah', role: 'Worship Leader', online: true },
    { name: 'Mike', role: 'Tech Director', online: true },
    { name: 'Anna', role: 'Stage Manager', online: true },
    { name: 'Jon', role: 'Pastor', online: false },
    { name: 'Lisa', role: 'Volunteer', online: true }
  ];

  return (
    <div className="glass-panel relative">
      <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-medium text-text-primary font-['JetBrains Mono'] tracking-[-0.02em]">Team Chat</h3>
          
          {/* Notification badge */}
          {!isMuted && !isCollapsed && (
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          )}
        </div>
        
        <div className="flex items-center gap-1.5">
          {/* Team members button */}
          <Tooltip content="Team members" position="top" alwaysShow={true}>
            <button 
              className={`p-1.5 rounded-full ${showUsers ? 'bg-[#2D68FF]/20 text-[#2D68FF]' : 'border-[1.5px] border-[var(--border-subtle)] bg-button-gradient backdrop-blur-glass'}`}
              onClick={toggleUsers}
              aria-label="Team members"
            >
              <Users className="w-4 h-4" />
            </button>
          </Tooltip>
          
          {/* Mute button */}
          <Tooltip content={isMuted ? "Unmute notifications" : "Mute notifications"} position="top" alwaysShow={true}>
            <button 
              className="p-1.5 border-[1.5px] border-[var(--border-subtle)] bg-button-gradient backdrop-blur-glass rounded-full"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute notifications" : "Mute notifications"}
            >
              {isMuted ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            </button>
          </Tooltip>
          
          {/* Minimize button */}
          <Tooltip content={isCollapsed ? "Expand chat" : "Collapse chat"} position="top" alwaysShow={true}>
            <button 
              className="p-1.5 border-[1.5px] border-[var(--border-subtle)] bg-button-gradient backdrop-blur-glass rounded-full"
              onClick={toggleCollapsed}
              aria-label={isCollapsed ? "Expand chat" : "Collapse chat"}
            >
              {isCollapsed ? <Plus className="w-4 h-4" /> : <MinusCircle className="w-4 h-4" />}
            </button>
          </Tooltip>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="flex">
          {/* Main chat area */}
          <div className="flex flex-col h-[280px] p-4 flex-1">
            <div className="space-y-3 flex-1 overflow-y-auto pr-1 mb-3 custom-scrollbar">
              {messages.map(({ id, name, role, message, timestamp, isYou }) => (
                <div key={id} className={`flex gap-3 ${isYou ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-glass ${
                    isYou 
                      ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20' 
                      : 'bg-gradient-to-br from-purple-500/20 to-blue-500/20'
                  }`}>
                    <span className={`text-sm font-medium ${isYou ? 'text-blue-400' : 'text-purple-400'}`}>
                      {name[0]}
                    </span>
                  </div>
                  
                  <div className={`${isYou ? 'items-end text-right' : ''} flex-1`}>
                    <div className={`flex items-baseline gap-2 ${isYou ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-baseline gap-2 ${isYou ? 'flex-row-reverse' : ''}`}>
                      <p className="text-sm font-medium text-text-primary font-['JetBrains Mono'] tracking-[-0.02em]">{name}</p>
                      <p className="text-xs text-text-secondary font-['JetBrains Mono'] tracking-[-0.02em]">{role}</p>
                      </div>
                      <p className="text-xs text-text-secondary font-['JetBrains Mono'] tracking-[-0.02em]">{timestamp}</p>
                    </div>
                    
                    <div className={`mt-0.5 ${isYou ? 'bg-blue-500/10 ml-8' : 'bg-[var(--background-glass)]/20 mr-8'} px-3 py-1.5 rounded-lg`}>
                      <p className="text-sm text-text-secondary font-['JetBrains Mono'] tracking-[-0.02em]">{message}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex gap-2">
                <Tooltip content="Attach file" position="top">
                  <button 
                    className="border-[1.5px] border-[var(--border-subtle)] bg-button-gradient backdrop-blur-glass p-2 rounded-full"
                    aria-label="Attach file"
                  >
                    <Paperclip className="w-4 h-4 text-text-secondary" />
                  </button>
                </Tooltip>
                
                <input 
                  type="text" 
                  placeholder="Send a message..." 
                  className="glass-input flex-1" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                
                <button 
                  className={`p-2 rounded-full ${newMessage.trim() ? 'bg-[#2D68FF] hover:bg-[#2D68FF]/90' : 'border-[1.5px] border-[var(--border-subtle)] bg-button-gradient backdrop-blur-glass'}`}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  aria-label="Send message"
                >
                  <Send className={`w-4 h-4 ${newMessage.trim() ? 'text-white' : 'text-text-secondary'}`} />
                </button>
              </div>
              <div className="text-xs text-text-secondary mt-1.5 text-center font-['JetBrains Mono'] tracking-[-0.02em]">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
          
          {/* Team members panel - conditionally shown */}
          {showUsers && (
            <div className="w-64 border-l border-[var(--border-subtle)] p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-text-primary font-['JetBrains Mono'] tracking-[-0.02em]">Team Members</h4>
                <button 
                  className="p-1 hover:bg-background-glass/20 rounded-full"
                  onClick={toggleUsers}
                  aria-label="Close team members panel"
                >
                  <X className="w-3.5 h-3.5 text-text-secondary" />
                </button>
              </div>
              
              <div className="space-y-2 max-h-[230px] overflow-y-auto custom-scrollbar">
                {teamMembers.map(member => (
                  <div key={member.name} className="flex items-center gap-2 p-1.5 hover:bg-background-glass/10 rounded-lg">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-background-glass/30">
                      <span className="text-sm text-text-primary">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm text-text-primary font-['JetBrains Mono'] tracking-[-0.02em]">{member.name}</p>
                      <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${member.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <p className="text-xs text-text-secondary font-['JetBrains Mono'] tracking-[-0.02em]">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamChat;
