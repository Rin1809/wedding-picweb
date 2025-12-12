import React, { useState } from 'react';
import { generateGuestMessage } from '../services/geminiService';
import { Sparkles, Send, Loader2, Copy, Check } from 'lucide-react';

const AIGuestbookHelper: React.FC = () => {
  const [relationship, setRelationship] = useState('');
  const [memory, setMemory] = useState('');
  const [tone, setTone] = useState<'emotional' | 'funny' | 'formal' | 'poetic'>('emotional');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!relationship || !memory) return;
    
    setIsLoading(true);
    setGeneratedMessage('');
    try {
      // Uses Gemini 3 Pro Preview with Thinking Budget 32k
      const message = await generateGuestMessage({ relationship, memory, tone });
      setGeneratedMessage(message);
    } catch (error) {
      setGeneratedMessage("Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="guestbook-ai" className="py-24 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-wedding-soft rounded-2xl shadow-xl border border-wedding-gold/20 overflow-hidden">
          <div className="bg-wedding-gold p-6 text-center">
            <div className="flex justify-center mb-3">
              <Sparkles className="text-white w-8 h-8 animate-pulse" />
            </div>
            <h2 className="text-white font-serif text-3xl font-semibold">
              Trợ Lý Lời Chúc AI
            </h2>
            <p className="text-wedding-champagne/90 font-sans mt-2 text-sm max-w-lg mx-auto">
              Không biết viết gì vào sổ lưu bút? Hãy để AI giúp bạn soạn một lời chúc thật ý nghĩa và cảm động dựa trên kỷ niệm của bạn.
            </p>
          </div>

          <div className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-wedding-text font-serif text-sm mb-2 font-bold uppercase tracking-wider">
                  Bạn là ai đối với cô dâu chú rể?
                </label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="Ví dụ: Bạn thân đại học, Em họ..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold outline-none transition-all bg-white"
                />
              </div>

              <div>
                <label className="block text-wedding-text font-serif text-sm mb-2 font-bold uppercase tracking-wider">
                  Kỷ niệm hoặc điều muốn gửi gắm
                </label>
                <textarea
                  value={memory}
                  onChange={(e) => setMemory(e.target.value)}
                  placeholder="Ví dụ: Nhớ lần đầu gặp nhau ở quán cà phê, mong hai bạn trăm năm hạnh phúc..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold outline-none transition-all bg-white h-32 resize-none"
                />
              </div>

              <div>
                <label className="block text-wedding-text font-serif text-sm mb-2 font-bold uppercase tracking-wider">
                  Phong cách lời chúc
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['emotional', 'funny', 'formal', 'poetic'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`py-2 px-3 rounded-md text-sm transition-all border ${
                        tone === t
                          ? 'bg-wedding-text text-white border-wedding-text'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {t === 'emotional' && 'Cảm động'}
                      {t === 'funny' && 'Hài hước'}
                      {t === 'formal' && 'Trang trọng'}
                      {t === 'poetic' && 'Thơ mộng'}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !relationship || !memory}
                className="w-full py-4 bg-wedding-gold text-white rounded-lg font-serif uppercase tracking-widest text-sm hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95 duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang suy nghĩ...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Tạo Lời Chúc
                  </>
                )}
              </button>
            </div>

            {/* Output Section */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col h-full relative">
              <h3 className="text-wedding-accent font-serif mb-4 text-center">Kết Quả</h3>
              
              <div className="flex-grow flex items-center justify-center">
                {generatedMessage ? (
                  <div className="font-script text-2xl md:text-3xl text-wedding-text leading-relaxed text-center p-4">
                    "{generatedMessage}"
                  </div>
                ) : (
                  <div className="text-gray-400 text-center italic text-sm">
                    {isLoading ? "AI đang suy nghĩ lời chúc hay nhất cho bạn..." : "Kết quả sẽ hiện ra ở đây..."}
                  </div>
                )}
              </div>

              {generatedMessage && (
                <button
                  onClick={copyToClipboard}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-wedding-gold transition-colors"
                  title="Sao chép"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIGuestbookHelper;