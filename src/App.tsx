import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Share2, RefreshCw, Award, User, 
  History, CreditCard, Linkedin, X, Gavel
} from 'lucide-react';
import { DATA } from './data';

export default function App() {
  const [award, setAward] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [totalFees, setTotalFees] = useState(0);
  const awardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const awardMatch = path.match(/^\/award\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/]+)\/([^\/\?]+)/);
    
    if (awardMatch) {
      const [_, fId, gId, cId, tId, uId, jStr] = awardMatch;
      
      const f = DATA.festivals.find(x => x.id === fId);
      const g = DATA.grades.find(x => x.id === gId);
      const c = DATA.categories.find(x => x.id === cId);
      const t = DATA.testimonials.find(x => x.id === tId);
      const u = DATA.clients.find(x => x.id === uId);
      
      if (f && g && c && t && u) {
        const juryIds = jStr ? jStr.split('_') : [];
        const selectedJury = juryIds.map((id: string) => DATA.juries.find(x => x.id === id)).filter(Boolean);
        
        if (selectedJury.length === 0) {
           selectedJury.push(DATA.juries[0], DATA.juries[1], DATA.juries[2]);
        }
        
        setAward({
          festival: f.text,
          grade: g.text,
          category: c.text,
          testimonial: t.text,
          client: u.text,
          jury: selectedJury.map((j: any) => j.text),
          indices: { f: f.id, g: g.id, c: c.id, t: t.id, u: u.id, j: selectedJury.map((j: any) => j.id).join('_') }
        });
        return;
      }
    }
    
    // Fallback if no valid path
    generateAward(true);
  }, []);

  const triggerConfetti = () => {
    const colors = ['#D4AF37', '#FFFFFF', '#C29E30', '#B7950B'];
    for (let i = 0; i < 70; i++) {
      const p = document.createElement('div');
      p.className = 'fixed pointer-events-none z-[9999]';
      const size = Math.random() * 8 + 6;
      p.style.width = size + 'px';
      p.style.height = (size * 0.7) + 'px';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = (Math.random() * 100) + 'vw';
      p.style.top = '-20px';
      p.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  };

  const generateAward = (isInitial = false) => {
    setIsGenerating(true);
    setTimeout(() => {
      const fIdx = Math.floor(Math.random() * DATA.festivals.length);
      const gIdx = Math.floor(Math.random() * DATA.grades.length);
      const cIdx = Math.floor(Math.random() * DATA.categories.length);
      const tIdx = Math.floor(Math.random() * DATA.testimonials.length);
      const uIdx = Math.floor(Math.random() * DATA.clients.length);
      
      const fObj = DATA.festivals[fIdx];
      const gObj = DATA.grades[gIdx];
      const cObj = DATA.categories[cIdx];
      const tObj = DATA.testimonials[tIdx];
      const uObj = DATA.clients[uIdx];
      
      const juryIdxs: number[] = [];
      while(juryIdxs.length < 3) {
        const r = Math.floor(Math.random() * DATA.juries.length);
        if(!juryIdxs.includes(r)) juryIdxs.push(r);
      }
      const selectedJury = juryIdxs.map(i => DATA.juries[i]);
      const jStr = selectedJury.map(j => j.id).join('_');
      const dataPath = `${fObj.id}/${gObj.id}/${cObj.id}/${tObj.id}/${uObj.id}/${jStr}`;

      const newAward = {
        festival: fObj.text,
        grade: gObj.text,
        category: cObj.text,
        testimonial: tObj.text,
        client: uObj.text,
        jury: selectedJury.map(j => j.text),
        indices: { f: fObj.id, g: gObj.id, c: cObj.id, t: tObj.id, u: uObj.id, j: jStr }
      };

      setAward(newAward);
      setHistory(prev => [newAward, ...prev].slice(0, 10));
      setTotalFees(prev => prev + 450);
      setIsGenerating(false);
      triggerConfetti();
      
      if (window.history.pushState) {
        if (isInitial) {
          window.history.replaceState({}, '', `/award/${dataPath}`);
        } else {
          window.history.pushState({}, '', `/award/${dataPath}`);
        }
      }
    }, 800);
  };

  const shareOnLinkedIn = () => {
    const shareUrl = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=600,height=600');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#D4AF37] selection:text-black pb-12 font-sans overflow-x-hidden">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-serif-simple { font-family: 'Lora', serif; }
      `}</style>
      
      <nav className="p-6 flex justify-between border-b border-white/5 uppercase text-[10px] tracking-[0.3em] font-bold text-neutral-500 sticky top-0 bg-[#0A0A0A]/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-4">
          <span>EST. 2026 — LISBOA</span>
          <div className="flex items-center gap-2 bg-yellow-400/10 text-[#D4AF37] px-3 py-1 rounded-full border border-[#D4AF37]/20 tracking-normal font-medium capitalize text-[9px]">
            <CreditCard size={10}/> {totalFees}€ em inscrições
          </div>
        </div>
        <span className="text-neutral-400 animate-pulse">Validação Gratuita™</span>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center">
        
        <header className="space-y-4 mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-serif leading-none tracking-tight">Ouro de Tolo</h1>
          <h2 className="text-lg md:text-xl font-serif italic text-[#D4AF37]">Gerador de Masturbação Criativa</h2>
        </header>

        <button 
          onClick={generateAward} 
          disabled={isGenerating}
          className="bg-[#D4AF37] text-black w-full max-w-md py-5 font-bold uppercase tracking-[0.2em] mb-12 hover:bg-[#C29E30] transition-all transform active:scale-95 disabled:opacity-50 shadow-lg shadow-yellow-600/10 cursor-pointer"
        >
          {isGenerating ? 'A Fabricar Prestígio...' : 'Gerar Prémio'}
        </button>

        {award && !isGenerating && (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* O CARTÃO DO PRÉMIO (Ratio 1.91:1) */}
            <div 
              ref={awardRef} 
              className="w-full aspect-[1200/630] border-2 border-[#D4AF37] bg-[#0A0A0A] p-6 md:p-10 relative group overflow-hidden flex flex-col justify-between"
            >
              {/* BLOCO SUPERIOR: Galardão + Categoria */}
              <div className="space-y-4 relative z-10">
                <section>
                  <label className="text-[8px] uppercase text-[#D4AF37] font-black tracking-[0.5em] block mb-1.5 opacity-60">Galardão Atribuído</label>
                  <h2 className="text-2xl md:text-4xl font-serif-simple font-black text-white leading-tight uppercase italic">
                    {award.grade}
                  </h2>
                </section>

                <section>
                  <label className="text-[8px] uppercase text-neutral-500 font-bold tracking-[0.4em] block mb-1 opacity-60">Categoria</label>
                  <p className="text-base md:text-lg font-medium leading-tight text-neutral-200">
                    "{award.category}"
                  </p>
                </section>
              </div>

              {/* BLOCO INFERIOR: Festival + Júri + Quote */}
              <div className="space-y-4 relative z-10">
                {/* Agrupamento de Festival e Juris para aproximar */}
                <div className="space-y-3">
                  <section>
                    <label className="text-[8px] uppercase text-neutral-500 font-bold tracking-[0.4em] block mb-1 opacity-60">Festival Oficial</label>
                    <h4 className="text-base md:text-lg font-serif-simple italic text-[#D4AF37] leading-none">{award.festival}</h4>
                  </section>

                  <section>
                    <div className="flex flex-wrap gap-x-5 gap-y-1">
                      {award.jury.map((member: string, i: number) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[9px] font-black uppercase text-neutral-400 tracking-tighter">{member}</span>
                          <span className="text-[6px] text-neutral-600 uppercase font-mono tracking-widest leading-none mt-0.5">Jury Member</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="border-t border-white/10 pt-4">
                   <div className="flex gap-4 items-start">
                      <div className="italic text-neutral-300 text-sm md:text-base leading-relaxed font-serif-simple max-w-2xl">
                        "{award.testimonial}"
                        <span className="text-[10px] font-medium text-neutral-500 not-italic block mt-2 uppercase tracking-widest">— {award.client}</span>
                      </div>
                   </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none group-hover:scale-110 transition-transform duration-1000 text-white">
                <Trophy size={450} />
              </div>
            </div>

            {/* BOTÃO DE PARTILHA */}
            <div className="w-full max-w-3xl mt-12 mb-16">
              <button onClick={shareOnLinkedIn} className="w-full border border-[#0077B5] text-[#0077B5] py-5 uppercase font-bold text-xs flex justify-center items-center gap-2 hover:bg-[#0077B5]/10 transition-colors cursor-pointer">
                <Linkedin size={16}/> Partilhar no LinkedIn para os invejosos verem
              </button>
            </div>

            {/* ESTANTE DE TROFÉUS */}
            <div className="w-full max-w-3xl border-t border-white/5 pt-12">
              <h4 className="text-[10px] tracking-[0.3em] font-black uppercase text-neutral-500 mb-8 flex items-center justify-center gap-2">
                <History size={14} /> Estante de Troféus (Sessão Atual)
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {history.map((h, i) => (
                  <div key={i} className="p-4 border border-white/5 bg-white/[0.02] rounded-lg group cursor-default hover:border-[#D4AF37]/30 transition-colors">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] mb-1">{h.grade}</p>
                    <p className="text-[10px] text-neutral-400 italic leading-tight">{h.festival}</p>
                  </div>
                ))}
                {history.length === 0 && <p className="col-span-full text-center text-xs italic text-neutral-600">Ainda não tens vitórias...</p>}
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] tracking-widest text-neutral-600 font-medium uppercase">
          <p>© 2026 Ouro de Tolo. Nenhum KPI foi consultado na criação deste site.</p>
          <div className="flex gap-4">
            <span className="text-[#D4AF37]">ROI: 0%</span>
            <span>Feito com ego e café de especialidade.</span>
          </div>
        </footer>
      </main>

      {/* Toast de Sucesso */}
      {showToast && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#D4AF37] text-black px-10 py-10 font-bold uppercase tracking-[0.2em] shadow-2xl max-w-md text-center border-4 border-black space-y-6">
            <div className="text-3xl font-black italic underline decoration-white underline-offset-8 uppercase leading-none text-black">Copiado! 🏆</div>
            <div className="text-xs font-black leading-relaxed uppercase text-black">
              Imagem e texto prontos para o teu ego. <br/>
              A abrir o LinkedIn... <br/>
              <span className="bg-black text-white px-3 py-2 mt-4 inline-block transform -rotate-1 text-[10px]">Faz Ctrl+V na caixa do post!</span>
            </div>
            <button onClick={() => setShowToast(false)} className="text-[10px] font-black underline mt-4 hover:text-white transition-colors uppercase text-black cursor-pointer">Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
