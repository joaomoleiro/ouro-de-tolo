const rawFestivals = [
  "CCP - Clube dos Criativos com Pressa",
  "Prémios M&P - Masturbação & Publicidade",
  "Cannes Lions (Categoria: Tivemos Orçamento)",
  "Effie Awards (Eficácia Duvidosa)",
  "El Ojo de Iberoamérica (O Olho que Tudo Vê)",
  "Prémios Marketeer (Quem Paga Leva)",
  "D&AD (Design & Art Direction & Egos)",
  "ADC*E (Art Directors Club of Excuses)",
  "APPM - Associação Portuguesa de Prémios Inventados",
  "Prémios Lusófonos da Criatividade Reciclada",
  "The One Show (That Nobody Watched)",
  "Web Summit Startup Bullshit Awards",
  "Festival de Criatividade de Algés",
  "Prémios Meios & Amigos",
  "Gala dos Criativos Exaustos",
  "Festival Internacional de Ideias Aprovadas à Sexta",
  "Prémios Eficácia (Nos Relatórios de Excel)",
  "Eurobest (Ou Pelo Menos Tentámos)",
  "Clio Awards (Edição Ibérica)",
  "Prémios de Comunicação Institucional e Chata"
];

const rawGrades = [
  "Grand Prix do Júri que é Nosso Amigo",
  "Leão de Ouro (Banhado a Prata)",
  "Lápis de Grafite (Que Partiu a Ponta)",
  "Ouro em 'Data-Driven' (Usámos o Excel)",
  "Prata por Falta de Orçamento",
  "Bronze 'Pelo Menos Fomos à Festa'",
  "Shortlist (A Vitória dos Pobres)",
  "Menção Honrosa 'Quase Viral'",
  "Prémio Carreira (Para Alguém com 30 Anos)",
  "Agência do Ano (Na Nossa Rua)",
  "Leão de Bronze (Comprado no eBay)",
  "Ouro em Inovação (Usámos ChatGPT)",
  "Grande Prémio 'O Cliente Adorou'",
  "Prata em 'Craft' (Demorámos 3 Meses a Fazer)",
  "Ouro Rosa Desconstruído",
  "Platina Bio-Sustentável",
  "Estanho Polido com Lágrimas de Estagiário",
  "Ouro de Tolo em Spray",
  "Diamante Sintético de Baixa Resolução",
  "Galardão de Vidro Soprado"
];

const rawCategories = [
  "Melhor Uso de Data (Lemos os Comentários no Facebook)",
  "Brand Experience & Activation (Demos Brindes na Praia)",
  "Guerrilha | Ação Especial (Colámos Autocolantes no Cais do Sodré)",
  "Craft - Copy em Publicidade (Trocadilhos com Cerveja)",
  "Filme - Direção de Fotografia (Gravado em Película para Parecer Caro)",
  "Social - Melhor Post Isolado (Aquele que o Cliente Aprovou à Primeira)",
  "Inovação em Experiências de Marca (Fizemos um Filtro de Instagram)",
  "Relações Públicas - Ação B2C (Enviámos Press Releases que Ninguém Leu)",
  "Projeto Integrado (Fizemos um Mupi, um Post e um Rádio)",
  "Estratégia de Marketing (Copiámos o que a Concorrência Fez no Ano Passado)",
  "Melhor Agência em Experiências de Marca (Temos uma Mesa de Matraquilhos)",
  "Creative Data | Culture & Context (Aproveitámos um Meme com 2 Meses)",
  "Melhor Rebranding (Mudámos a Fonte para Montserrat)",
  "B2C Marketing (Comprámos Seguidores na Índia)",
  "Melhor Uso de Influencer (Pagámos a Alguém do Big Brother)",
  "Comunicação Institucional (Vídeo com Drone e Música Emocional)",
  "Melhor 'Case Study' onde os números de engagement são inventados",
  "Categoria: 'O Cliente não queria, mas nós fizemos para o portfólio'",
  "Melhor Podcast de agência que só os funcionários ouvem",
  "Social - Campanha de ativação em social media (Fizemos um Passatempo)"
];

const rawTestimonials = [
  "O nosso CEO ainda não percebeu o que é, mas ficou contente com o ouro.",
  "Finalmente, algo para pôr no LinkedIn sem ser uma selfie no Web Summit.",
  "Não vendemos nem mais uma lata de atum, mas o troféu fica lindo na receção.",
  "O ROI é baixo, mas o meu prestígio no JNcQUOI subiu imenso.",
  "A prova de que com o orçamento certo e os amigos certos, tudo é possível.",
  "Um prémio que celebra a nossa capacidade de dizer 'disruptivo' sem rir.",
  "O meu pai finalmente percebeu o que eu faço.",
  "Ganhámos! Agora já posso pedir um aumento que vai ser recusado.",
  "Este prémio valida a nossa decisão de ignorar o briefing do cliente.",
  "Mudámos o mundo. Ou pelo menos o feed de 200 pessoas em Algés.",
  "O júri foi fantástico. Especialmente porque eu jantei com eles ontem.",
  "A categoria era tão específica que éramos os únicos concorrentes. Merecido!",
  "O cliente chorou na apresentação. De rir ou de tristeza, não interessa.",
  "Mais um 'tijolo' para o meu castelo de cartas profissional.",
  "Foi um trabalho de equipa, mas eu vou levar o troféu para casa.",
  "O culminar de meses de reuniões que podiam ter sido e-mails.",
  "A nossa marca agora tem alma. Uma alma com 15% de desconto direto.",
  "É isto que separa os homens dos meninos e os diretores de arte dos designers.",
  "Viva a criatividade nacional! Alguém sabe onde é o after-party?",
  "Inovação é isto: fazer o mesmo de sempre, mas com um filtro diferente."
];

const rawClients = [
  "Maria do Carmo Leitão, VP of Vibes", "Catarina Sofia Braga, Senior Purpose Architect", 
  "Tiago 'Tuga' Mendes, Head of Disruptive Evangelism", "Bernardo Vasconcelos, Chief Happiness Officer", 
  "Matilde von Hoeffen, Lead Growth Hacker", "João Pedro Arriaga, Brand Ninja", 
  "Margarida Líbano, Director of Emotional Storytelling", "Gonçalo Silva, Crypto-Marketing Specialist", 
  "Beatriz Nunes, VP of Aesthetic Sustainability", "Ricardo Paiva, Senior Manager of Empty Metrics", 
  "Filipa Castelo, Head of Gen Z Relevance", "Duarte Amaral, Chief Vibes Officer", 
  "Inês de Castro, Brand Experience Alchemist", "Zé Maria, Senior Strategist of Common Sense", 
  "Carmo Rebelo, Tik Tok Guru", "Afonso Beirão, Director of Radical Transparency", 
  "Teresa Faria, Head of Holistic Journeys", "Vasco Gama, Discovery Lead", 
  "Sílvia Pontes, Chief Influence Liaison", "Patrícia Reis, VP of Synergy"
];

const rawJuries = [
  "Susana 'Lioness' Albuquerque", "Edson 'The Legend' Athayde", "Ricardo 'Gold' Domingues", 
  "Rita 'Purpose' Salvado", "Judite 'Craft' Mota", "Paulo 'Maverick' Pinto", 
  "Marcelo 'Case Study' Lourenço", "Nuno 'Viral' Jerónimo", "Pedro 'Disruptive' Ferreira", 
  "Lourenço 'Network' Garcia", "Zé Maria 'Old School' Silva", "Inês 'Insights' Patrício"
];

const createSlugs = (arr: string[]) => {
  const seen = new Set();
  return arr.map((text, index) => {
    let slug = text.toLowerCase()
      .replace(/[àáâãäå]/g,"a")
      .replace(/[èéêë]/g,"e")
      .replace(/[ìíîï]/g,"i")
      .replace(/[òóôõö]/g,"o")
      .replace(/[ùúûü]/g,"u")
      .replace(/[ç]/g,"c")
      .replace(/\b(o|a|os|as|de|do|da|dos|das|the|e|and|in|on|at|to|for|with|um|uma)\b/g, '')
      .replace(/[^\w\s\-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/\-\-+/g, '-')
      .substring(0, 15)
      .replace(/-+$/, '');
    
    if (!slug) slug = `item-${index}`;
    
    let finalSlug = slug;
    let counter = 1;
    while (seen.has(finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }
    seen.add(finalSlug);
    return { id: finalSlug, text };
  });
};

export const DATA = {
  festivals: createSlugs(rawFestivals),
  grades: createSlugs(rawGrades),
  categories: createSlugs(rawCategories),
  testimonials: createSlugs(rawTestimonials),
  clients: createSlugs(rawClients),
  juries: createSlugs(rawJuries)
};
