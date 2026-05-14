import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  BookOpen, 
  Gamepad2, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Zap, 
  MousePointer2,
  Info
} from 'lucide-react';

const toolLogos = {
  Blender: "blender",
  Audacity: "audacity",
  GIMP: "gimp",
  Inkscape: "inkscape",
  Pencil2D: null,
  "Synfig Studio": null,
  "Paint.NET": null,
  Flutter: "flutter",
  "React Native": "react",
  WordPress: "wordpress",
  "Adobe Premiere Pro": "adobepremiere",
  "Adobe Photoshop": "adobephotoshop",
  "Adobe Illustrator": "adobeillustrator",
  "Final Cut Pro": null,
  "DaVinci Resolve": "davinciresolve",
  Canva: "canva",
  Figma: "figma",
  iMovie: null,
  Wix: "wix",
  Slack: "slack",
  Zoom: "zoom",
  Notion: "notion",
  "Google Drive": "googledrive",
  CapCut: null,
  Trello: "trello",
};

const toolsData = [
  { name: "Blender", category: "Video / 3D", use: "3D modeling, animation, and video editing", license: "Open Source", url: "https://www.blender.org/" },
  { name: "Audacity", category: "Audio", use: "Multi-track audio recording and editing", license: "Open Source", url: "https://www.audacityteam.org/" },
  { name: "GIMP", category: "Graphic Design", use: "Raster image manipulation and photo retouching", license: "Open Source", url: "https://www.gimp.org/" },
  { name: "Inkscape", category: "Graphic Design", use: "Vector graphics editing (SVG format)", license: "Open Source", url: "https://inkscape.org/" },
  { name: "Pencil2D", category: "Animation", use: "Traditional 2D hand-drawn animation", license: "Open Source", url: "https://www.pencil2d.org/" },
  { name: "Synfig Studio", category: "Animation", use: "Vector-based 2D animation", license: "Open Source", url: "https://www.synfig.org/" },
  { name: "Paint.NET", category: "Graphic Design", use: "Raster image editing and photo manipulation", license: "Open Source (Core) / Proprietary (Installer)", url: "https://www.getpaint.net/" },
  { name: "Flutter", category: "Development", use: "Cross-platform mobile and web app development", license: "Open Source", url: "https://flutter.dev/" },
  { name: "React Native", category: "Development", use: "Mobile application framework (JavaScript-based)", license: "Open Source", url: "https://reactnative.dev/" },
  { name: "WordPress", category: "Web", use: "Content management (CMS) and web publishing", license: "Open Source", url: "https://wordpress.org/" },
  { name: "Adobe Premiere Pro", category: "Video", use: "Professional non-linear video editing", license: "Proprietary", url: "https://www.adobe.com/products/premiere.html" },
  { name: "Adobe Photoshop", category: "Graphic Design", use: "Professional raster graphics and photo editing", license: "Proprietary", url: "https://www.adobe.com/products/photoshop.html" },
  { name: "Adobe Illustrator", category: "Graphic Design", use: "Professional vector graphics design", license: "Proprietary", url: "https://www.adobe.com/products/illustrator.html" },
  { name: "Final Cut Pro", category: "Video", use: "Professional video editing for macOS", license: "Proprietary", url: "https://www.apple.com/final-cut-pro/" },
  { name: "DaVinci Resolve", category: "Video", use: "Video editing, color grading, and VFX", license: "Proprietary (Freemium)", url: "https://www.blackmagicdesign.com/products/davinciresolve" },
  { name: "Canva", category: "Graphic Design", use: "Graphic design and template-based creation", license: "Proprietary", url: "https://www.canva.com/" },
  { name: "Figma", category: "UI/UX Design", use: "Interface design (UI/UX) and prototyping", license: "Proprietary", url: "https://www.figma.com/" },
  { name: "iMovie", category: "Video", use: "Consumer-level video editing (Apple devices)", license: "Proprietary", url: "https://www.apple.com/imovie/" },
  { name: "Wix", category: "Web", use: "Website building and hosting", license: "Proprietary", url: "https://www.wix.com/" },
  { name: "Slack", category: "Collaboration", use: "Team communication and instant messaging", license: "Proprietary", url: "https://slack.com/" },
  { name: "Zoom", category: "Collaboration", use: "Video conferencing and virtual meetings", license: "Proprietary", url: "https://zoom.us/" },
  { name: "Notion", category: "Productivity", use: "Project management, note-taking, and wikis", license: "Proprietary", url: "https://www.notion.so/" },
  { name: "Google Drive", category: "Collaboration", use: "Cloud storage and file collaboration", license: "Proprietary", url: "https://www.google.com/drive/" },
  { name: "CapCut", category: "Video", use: "Mobile-first video editing and effects", license: "Proprietary", url: "https://www.capcut.com/" },
  { name: "Trello", category: "Productivity", use: "Visual project management and task tracking", license: "Proprietary", url: "https://trello.com/" }
].map(t => ({
  ...t,
  logo: toolLogos[t.name] ? `https://cdn.jsdelivr.net/npm/simple-icons/icons/${toolLogos[t.name]}.svg` : null
}));

const App = () => {
  const [view, setView] = useState('study'); // study, quiz, game
  const [searchTerm, setSearchTerm] = useState('');
  const [score, setScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizQuestion, setQuizQuestion] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);

  // Generate a random quiz question
  const generateQuestion = () => {
    const randomTool = toolsData[Math.floor(Math.random() * toolsData.length)];
    const types = ['license', 'category', 'use'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let questionText = "";
    let correctAnswer = "";
    let options = [];

    if (type === 'license') {
      questionText = `Is "${randomTool.name}" Open Source or Proprietary?`;
      correctAnswer = randomTool.license.includes("Open Source") ? "Open Source" : "Proprietary";
      options = ["Open Source", "Proprietary"];
    } else if (type === 'category') {
      questionText = `Which category does "${randomTool.name}" belong to?`;
      correctAnswer = randomTool.category;
      const categories = [...new Set(toolsData.map(t => t.category))];
      options = [correctAnswer, ...categories.filter(c => c !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 3)].sort();
    } else {
      questionText = `What is the primary use for "${randomTool.name}"?`;
      correctAnswer = randomTool.use;
      options = [correctAnswer, ...toolsData.filter(t => t.use !== correctAnswer).sort(() => 0.5 - Math.random()).slice(0, 3).map(t => t.use)].sort();
    }

    setQuizQuestion({ questionText, correctAnswer, options, tool: randomTool.name });
    setQuizFeedback(null);
  };

  useEffect(() => {
    if (view === 'quiz') generateQuestion();
  }, [view]);

  const handleAnswer = (answer) => {
    if (answer === quizQuestion.correctAnswer) {
      setScore(s => s + 10);
      setQuizFeedback({ type: 'success', message: "Correct! Keep it up." });
      setTimeout(generateQuestion, 1500);
    } else {
      setQuizFeedback({ type: 'error', message: `Wrong! The correct answer was: ${quizQuestion.correctAnswer}` });
      setTimeout(generateQuestion, 3000);
    }
  };

  const toggleLesson = (toolName) => {
    setCompletedLessons(prev => 
      prev.includes(toolName) ? prev.filter(t => t !== toolName) : [...prev, toolName]
    );
  };

  const filteredTools = toolsData.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2">
            <Zap className="fill-indigo-700" /> Digital Media Quest
          </h1>
          <p className="text-slate-500">Master your Form 6 Digital Media Tools</p>
        </div>
        <div className="flex bg-white rounded-xl shadow-sm border p-1">
          <button 
            onClick={() => setView('study')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${view === 'study' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <BookOpen size={18} /> Study
          </button>
          <button 
            onClick={() => setView('quiz')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${view === 'quiz' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Gamepad2 size={18} /> Practice Quiz
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Progress Tracker */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
              <Trophy size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Total Points</p>
              <p className="text-3xl font-black text-slate-800">{score + (completedLessons.length * 5)}</p>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-600">Tools Explored</span>
              <span className="text-indigo-600 font-bold">{completedLessons.length} / {toolsData.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full transition-all duration-500 ease-out" 
                style={{ width: `${(completedLessons.length / toolsData.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {view === 'study' && (
          <div className="space-y-6">
            {/* Search & Intro */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search tools, categories, or functions..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool) => (
                <div 
                  key={tool.name}
                  className={`group relative bg-white border rounded-2xl p-5 transition-all hover:shadow-lg hover:-translate-y-1 ${completedLessons.includes(tool.name) ? 'border-green-200 bg-green-50/30' : 'border-slate-200'}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-tighter ${tool.license.includes('Open Source') ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {tool.license.includes('Open Source') ? 'Open Source' : 'Proprietary'}
                    </span>
                    <button 
                      onClick={() => toggleLesson(tool.name)}
                      className={`p-1.5 rounded-full transition-colors ${completedLessons.includes(tool.name) ? 'text-green-600 bg-green-100' : 'text-slate-300 hover:text-indigo-500 hover:bg-indigo-50'}`}
                    >
                      <CheckCircle2 size={24} />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
                    {tool.logo && (
                      <img src={tool.logo} alt="" className="w-6 h-6" onError={(e) => e.target.style.display = 'none'} />
                    )}
                    {tool.name}
                  </h3>
                  <p className="text-indigo-600 text-sm font-medium mb-3">{tool.category}</p>
                  <p className="text-slate-600 text-sm line-clamp-2 mb-4 h-10">{tool.use}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <a 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                    >
                      VISIT SITE <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTools.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
                <Search size={48} className="mx-auto text-slate-200 mb-4" />
                <p className="text-slate-500 font-medium">No tools found matching your search.</p>
              </div>
            )}
          </div>
        )}

        {view === 'quiz' && quizQuestion && (() => {
          const quizTool = toolsData.find(t => t.name === quizQuestion.tool);
          return (
          <div className="max-w-2xl mx-auto py-12">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-indigo-50 text-center">
              <div className="inline-flex p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-6 gap-3 items-center">
                {quizTool?.logo ? (
                  <img src={quizTool.logo} alt="" className="w-8 h-8" onError={(e) => e.target.style.display = 'none'} />
                ) : (
                  <MousePointer2 size={32} />
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-8">{quizQuestion.questionText}</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {quizQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={!!quizFeedback}
                    onClick={() => handleAnswer(option)}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all text-left flex items-center justify-between group
                      ${quizFeedback?.type === 'success' && option === quizQuestion.correctAnswer ? 'bg-green-500 text-white border-green-500' : 
                        quizFeedback?.type === 'error' && option === quizQuestion.correctAnswer ? 'bg-green-100 border-green-500 text-green-700' :
                        'bg-white border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700'}
                    `}
                  >
                    {option}
                    <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${quizFeedback ? 'hidden' : ''}`}>
                      <Zap size={16} className="text-indigo-500" />
                    </div>
                  </button>
                ))}
              </div>

              {quizFeedback && (
                <div className={`mt-8 p-4 rounded-xl flex items-center justify-center gap-2 font-bold animate-bounce
                  ${quizFeedback.type === 'success' ? 'text-green-600' : 'text-rose-600'}
                `}>
                  {quizFeedback.message}
                </div>
              )}
            </div>
          </div>
        );
      })()}
      </main>

      {/* Footer Info Section */}
      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-200 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-4">
              <Info size={20} className="text-indigo-500" /> Why this matters
            </h4>
            <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
              <p>
                In Form 6 Digital Media, understanding the difference between <strong>Proprietary</strong> and <strong>Open Source</strong> software is crucial for project planning and cost management.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Open Source:</strong> Free to use, modify, and distribute. Great for student budgets.</li>
                <li><strong>Proprietary:</strong> Commercial software usually requiring a subscription. Often industry standards.</li>
              </ul>
            </div>
          </div>
          <div className="bg-indigo-900 rounded-3xl p-8 text-white">
            <h4 className="font-bold text-xl mb-4">Pro Study Tip</h4>
            <p className="text-indigo-200 text-sm mb-6">
              Don't just memorize the table! Download one "Open Source" alternative (like GIMP instead of Photoshop) and try to perform one basic task. Real experience is the best way to remember functionality.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-indigo-300">Retention</p>
              </div>
              <div className="flex-1 bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold">Free</p>
                <p className="text-[10px] uppercase tracking-widest text-indigo-300">Access</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;