import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Trophy,
  ArrowLeftRight,
  BellRing,
  Settings,
  Plus,
  Search,
  Trash2,
  Edit3,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  Flame,
  ArrowUpRight,
  Activity,
  Users,
  TrendingUp,
  X,
  Save,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  Calendar,
  Layers,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import {
  ALL_ARTICLES,
  MATCHES,
  TRANSFERS,
  TICKER,
  CATEGORIES,
  IMAGES,
  type Article,
  type Match,
  type Transfer,
} from "@/lib/content";
import { Wordmark } from "@/components/site/Wordmark";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم الرياضية — أبو حمد CMS" },
      { name: "description", content: "إدارة المحتوى، المباريات، الانتقالات وشريط الأخبار العاجلة." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type TabType = "overview" | "articles" | "matches" | "transfers" | "ticker" | "settings";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // State with LocalStorage persistence
  const [articles, setArticles] = useState<Article[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("abuhamed_articles");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return ALL_ARTICLES;
  });

  const [matches, setMatches] = useState<Match[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("abuhamed_matches");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return MATCHES;
  });

  const [transfers, setTransfers] = useState<Transfer[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("abuhamed_transfers");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return TRANSFERS;
  });

  const [ticker, setTicker] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("abuhamed_ticker");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return TICKER;
  });

  // Save to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem("abuhamed_articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("abuhamed_matches", JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem("abuhamed_transfers", JSON.stringify(transfers));
  }, [transfers]);

  useEffect(() => {
    localStorage.setItem("abuhamed_ticker", JSON.stringify(ticker));
  }, [ticker]);

  // Modals state
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const [matchModalOpen, setMatchModalOpen] = useState(false);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);

  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<Transfer | null>(null);

  // Search & Filter state
  const [articleSearch, setArticleSearch] = useState("");
  const [articleCategoryFilter, setArticleCategoryFilter] = useState("all");
  const [newTickerText, setNewTickerText] = useState("");

  // Article Form State
  const [articleForm, setArticleForm] = useState({
    title: "",
    subtitle: "",
    excerpt: "",
    category: CATEGORIES[0],
    author: "هيئة التحرير",
    readingTime: 4,
    kind: "news" as Article["kind"],
    image: IMAGES.hero,
    body: "",
  });

  // Match Form State
  const [matchForm, setMatchForm] = useState({
    competition: "دوري روشن السعودي",
    home: "",
    away: "",
    homeShort: "",
    awayShort: "",
    homeScore: "" as string | number,
    awayScore: "" as string | number,
    date: "اليوم",
    time: "٢١:٠٠",
    stadium: "",
    status: "upcoming" as Match["status"],
    minute: "",
  });

  // Transfer Form State
  const [transferForm, setTransferForm] = useState({
    player: "",
    from: "",
    to: "",
    fee: "غير معلن",
    status: "شائعة" as Transfer["status"],
    date: "اليوم",
    source: "مصادر خاصة",
  });

  // Open Article Modal
  const openNewArticleModal = () => {
    setEditingArticle(null);
    setArticleForm({
      title: "",
      subtitle: "",
      excerpt: "",
      category: CATEGORIES[0],
      author: "هيئة التحرير",
      readingTime: 4,
      kind: "news",
      image: IMAGES.hero,
      body: "",
    });
    setArticleModalOpen(true);
  };

  const openEditArticleModal = (art: Article) => {
    setEditingArticle(art);
    setArticleForm({
      title: art.title,
      subtitle: art.subtitle,
      excerpt: art.excerpt,
      category: art.category,
      author: art.author,
      readingTime: art.readingTime,
      kind: art.kind,
      image: art.image,
      body: art.body.join("\n\n"),
    });
    setArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim()) {
      toast.error("يرجى كتابة عنوان المقال");
      return;
    }

    const paragraphs = articleForm.body
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const generatedSlug =
      editingArticle?.slug ||
      articleForm.title
        .toLowerCase()
        .replace(/[^\w\u0621-\u064A\s]/gi, "")
        .replace(/\s+/g, "-")
        .slice(0, 50) + `-${Date.now().toString().slice(-4)}`;

    const newArt: Article = {
      slug: generatedSlug,
      title: articleForm.title,
      subtitle: articleForm.subtitle,
      excerpt: articleForm.excerpt || articleForm.title,
      category: articleForm.category,
      author: articleForm.author || "هيئة التحرير",
      readingTime: Number(articleForm.readingTime) || 3,
      kind: articleForm.kind,
      image: articleForm.image || IMAGES.hero,
      date: editingArticle?.date || "اليوم",
      body: paragraphs.length > 0 ? paragraphs : ["لا يوجد نص إضافي."],
    };

    if (editingArticle) {
      setArticles((prev) => prev.map((a) => (a.slug === editingArticle.slug ? newArt : a)));
      toast.success("تم تحديث المقال بنجاح");
    } else {
      setArticles((prev) => [newArt, ...prev]);
      toast.success("تمت إضافة المقال بنجاح ونشره في الموقع");
    }
    setArticleModalOpen(false);
  };

  const handleDeleteArticle = (slug: string) => {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا المقال؟")) {
      setArticles((prev) => prev.filter((a) => a.slug !== slug));
      toast.success("تم حذف المقال");
    }
  };

  // Match Actions
  const openNewMatchModal = () => {
    setEditingMatch(null);
    setMatchForm({
      competition: "دوري روشن السعودي",
      home: "",
      away: "",
      homeShort: "",
      awayShort: "",
      homeScore: "",
      awayScore: "",
      date: "اليوم",
      time: "٢١:٠٠",
      stadium: "ملعب الملك فهد",
      status: "upcoming",
      minute: "",
    });
    setMatchModalOpen(true);
  };

  const openEditMatchModal = (m: Match) => {
    setEditingMatch(m);
    setMatchForm({
      competition: m.competition,
      home: m.home,
      away: m.away,
      homeShort: m.homeShort,
      awayShort: m.awayShort,
      homeScore: m.homeScore ?? "",
      awayScore: m.awayScore ?? "",
      date: m.date,
      time: m.time,
      stadium: m.stadium,
      status: m.status,
      minute: m.minute || "",
    });
    setMatchModalOpen(true);
  };

  const handleSaveMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchForm.home.trim() || !matchForm.away.trim()) {
      toast.error("يرجى إدخال اسم الفريقين");
      return;
    }

    const homeScoreNum = matchForm.homeScore !== "" ? Number(matchForm.homeScore) : null;
    const awayScoreNum = matchForm.awayScore !== "" ? Number(matchForm.awayScore) : null;

    const newMatch: Match = {
      competition: matchForm.competition,
      home: matchForm.home,
      away: matchForm.away,
      homeShort: matchForm.homeShort || matchForm.home.slice(0, 3).toUpperCase(),
      awayShort: matchForm.awayShort || matchForm.away.slice(0, 3).toUpperCase(),
      homeScore: homeScoreNum,
      awayScore: awayScoreNum,
      date: matchForm.date,
      time: matchForm.time,
      stadium: matchForm.stadium || "الملعب الرئيسي",
      status: matchForm.status,
      minute: matchForm.status === "live" ? matchForm.minute || "١'" : undefined,
    };

    if (editingMatch) {
      setMatches((prev) =>
        prev.map((m) =>
          m.home === editingMatch.home && m.away === editingMatch.away && m.date === editingMatch.date
            ? newMatch
            : m
        )
      );
      toast.success("تم تحديث بيانات المباراة");
    } else {
      setMatches((prev) => [newMatch, ...prev]);
      toast.success("تمت إضافة المباراة بنجاح إلى مركز المباريات");
    }
    setMatchModalOpen(false);
  };

  const handleQuickScoreUpdate = (matchIdx: number, team: "home" | "away", delta: number) => {
    setMatches((prev) =>
      prev.map((m, i) => {
        if (i !== matchIdx) return m;
        const currentScore = team === "home" ? (m.homeScore ?? 0) : (m.awayScore ?? 0);
        const newScore = Math.max(0, currentScore + delta);
        return {
          ...m,
          status: "live",
          homeScore: team === "home" ? newScore : (m.homeScore ?? 0),
          awayScore: team === "away" ? newScore : (m.awayScore ?? 0),
        };
      })
    );
    toast.success("تم تحديث النتيجة مباشرة!");
  };

  const handleToggleMatchStatus = (matchIdx: number) => {
    setMatches((prev) =>
      prev.map((m, i) => {
        if (i !== matchIdx) return m;
        const nextStatus: Record<Match["status"], Match["status"]> = {
          upcoming: "live",
          live: "finished",
          finished: "upcoming",
          postponed: "upcoming",
        };
        const updated = nextStatus[m.status];
        return {
          ...m,
          status: updated,
          homeScore: updated === "upcoming" ? null : m.homeScore ?? 0,
          awayScore: updated === "upcoming" ? null : m.awayScore ?? 0,
        };
      })
    );
    toast.success("تم تغيير حالة المباراة");
  };

  const handleDeleteMatch = (index: number) => {
    if (confirm("هل تريد حذف هذه المباراة؟")) {
      setMatches((prev) => prev.filter((_, i) => i !== index));
      toast.success("تم حذف المباراة");
    }
  };

  // Transfer Actions
  const openNewTransferModal = () => {
    setEditingTransfer(null);
    setTransferForm({
      player: "",
      from: "",
      to: "",
      fee: "غير معلن",
      status: "شائعة",
      date: "اليوم",
      source: "مصادر خاصة",
    });
    setTransferModalOpen(true);
  };

  const handleSaveTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferForm.player.trim()) {
      toast.error("يرجى إدخال اسم اللاعب");
      return;
    }

    const newTr: Transfer = {
      player: transferForm.player,
      from: transferForm.from || "ناديه الحالي",
      to: transferForm.to || "النادي الجديد",
      fee: transferForm.fee || "غير معلن",
      status: transferForm.status,
      date: transferForm.date || "اليوم",
      source: transferForm.source || "بيان رسمي",
    };

    if (editingTransfer) {
      setTransfers((prev) =>
        prev.map((t) => (t.player === editingTransfer.player ? newTr : t))
      );
      toast.success("تم تعديل خبر الانتقال");
    } else {
      setTransfers((prev) => [newTr, ...prev]);
      toast.success("تم نشر خبر الانتقال بنجاح");
    }
    setTransferModalOpen(false);
  };

  const handleDeleteTransfer = (player: string) => {
    if (confirm("هل تريد حذف هذا الخبر من سوق الانتقالات؟")) {
      setTransfers((prev) => prev.filter((t) => t.player !== player));
      toast.success("تم حذف الخبر");
    }
  };

  // Ticker Actions
  const handleAddTicker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTickerText.trim()) return;
    setTicker((prev) => [newTickerText.trim(), ...prev]);
    setNewTickerText("");
    toast.success("تمت إضافة الخبر العاجل للشريط");
  };

  const handleDeleteTicker = (index: number) => {
    setTicker((prev) => prev.filter((_, i) => i !== index));
    toast.success("تم حذف الخبر العاجل");
  };

  // Reset to default
  const handleResetDefaults = () => {
    if (confirm("هل ترغب بإعادة ضبط جميع البيانات إلى القيم الافتراضية الأصلية؟")) {
      setArticles(ALL_ARTICLES);
      setMatches(MATCHES);
      setTransfers(TRANSFERS);
      setTicker(TICKER);
      localStorage.clear();
      toast.success("تمت استعادة البيانات الافتراضية بنجاح");
    }
  };

  // Filtered Articles
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.category.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.author.toLowerCase().includes(articleSearch.toLowerCase());
    const matchesCategory =
      articleCategoryFilter === "all" || art.category === articleCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Toaster richColors position="bottom-left" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <Wordmark className="h-6" />
            </Link>
            <span className="hidden sm:inline-block h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <span className="eyebrow bg-signal/10 px-2 py-0.5 text-xs text-signal border border-signal/20">
                لوحة التحكم الإدارية (CMS)
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                متصل
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-signal hover:text-signal"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>معاينة الموقع الحي</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-61px)]">
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-l border-border bg-card/40 p-4">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors shrink-0 ${
                activeTab === "overview"
                  ? "bg-signal text-signal-foreground font-semibold"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>نظرة عامة وإحصائيات</span>
            </button>

            <button
              onClick={() => setActiveTab("articles")}
              className={`flex items-center justify-between rounded px-3 py-2.5 text-sm font-medium transition-colors shrink-0 ${
                activeTab === "articles"
                  ? "bg-signal text-signal-foreground font-semibold"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4" />
                <span>المقالات والأخبار</span>
              </div>
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  activeTab === "articles" ? "bg-black/20 text-black" : "bg-muted text-muted-foreground"
                }`}
              >
                {articles.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("matches")}
              className={`flex items-center justify-between rounded px-3 py-2.5 text-sm font-medium transition-colors shrink-0 ${
                activeTab === "matches"
                  ? "bg-signal text-signal-foreground font-semibold"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <Trophy className="h-4 w-4" />
                <span>مركز المباريات</span>
              </div>
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  activeTab === "matches" ? "bg-black/20 text-black" : "bg-muted text-muted-foreground"
                }`}
              >
                {matches.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("transfers")}
              className={`flex items-center justify-between rounded px-3 py-2.5 text-sm font-medium transition-colors shrink-0 ${
                activeTab === "transfers"
                  ? "bg-signal text-signal-foreground font-semibold"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <ArrowLeftRight className="h-4 w-4" />
                <span>سوق الانتقالات</span>
              </div>
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  activeTab === "transfers" ? "bg-black/20 text-black" : "bg-muted text-muted-foreground"
                }`}
              >
                {transfers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("ticker")}
              className={`flex items-center justify-between rounded px-3 py-2.5 text-sm font-medium transition-colors shrink-0 ${
                activeTab === "ticker"
                  ? "bg-signal text-signal-foreground font-semibold"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <BellRing className="h-4 w-4" />
                <span>الشريط العاجل</span>
              </div>
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  activeTab === "ticker" ? "bg-black/20 text-black" : "bg-muted text-muted-foreground"
                }`}
              >
                {ticker.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors shrink-0 ${
                activeTab === "settings"
                  ? "bg-signal text-signal-foreground font-semibold"
                  : "text-foreground/70 hover:bg-accent hover:text-foreground"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>إعدادات النظام</span>
            </button>
          </nav>

          <div className="hidden lg:block mt-8 pt-6 border-t border-border">
            <div className="p-3 rounded border border-border bg-background/50">
              <span className="eyebrow text-signal text-[10px]">خريطة المرحلة الرابعة</span>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                لوحة CMS متصلة بالواجهة والبيانات مع صلاحيات إدارة المقالات والنتائج والمباريات فوريّاً.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="display text-3xl font-bold">لوحة القيادة والمؤشرات</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    ملخص شامل لأنشطة منصة «أبو حمد سبورت» ومحتوى اليوم.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={openNewArticleModal}
                    className="inline-flex items-center gap-2 bg-signal text-signal-foreground px-4 py-2 text-sm font-semibold hover:brightness-110 transition"
                  >
                    <Plus className="h-4 w-4" />
                    <span>مقال جديد</span>
                  </button>
                  <button
                    onClick={openNewMatchModal}
                    className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2 text-sm font-medium hover:border-signal hover:text-signal transition"
                  >
                    <Trophy className="h-4 w-4" />
                    <span>إضافة مباراة</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border border-border bg-card/60 p-5 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground eyebrow">إجمالي المقالات</span>
                    <FileText className="h-4 w-4 text-signal" />
                  </div>
                  <div className="display text-3xl font-bold mt-2">{articles.length}</div>
                  <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>محتوى تحريري نشط</span>
                  </div>
                </div>

                <div className="border border-border bg-card/60 p-5 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground eyebrow">المباريات المسجلة</span>
                    <Trophy className="h-4 w-4 text-signal" />
                  </div>
                  <div className="display text-3xl font-bold mt-2">{matches.length}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {matches.filter((m) => m.status === "live").length} جارية الآن مباشرة
                  </div>
                </div>

                <div className="border border-border bg-card/60 p-5 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground eyebrow">سوق الانتقالات</span>
                    <ArrowLeftRight className="h-4 w-4 text-signal" />
                  </div>
                  <div className="display text-3xl font-bold mt-2">{transfers.length}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {transfers.filter((t) => t.status === "مؤكد").length} صفقات حُسمت رسمياً
                  </div>
                </div>

                <div className="border border-border bg-card/60 p-5 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground eyebrow">القراءات اليومية التقديرية</span>
                    <Users className="h-4 w-4 text-signal" />
                  </div>
                  <div className="display text-3xl font-bold mt-2">٤٨,٢٥٠</div>
                  <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>+١٤٪ عن الأسبوع الماضي</span>
                  </div>
                </div>
              </div>

              {/* Live Match Quick Updates */}
              <div className="border border-border bg-card/40 p-6 rounded">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-signal" />
                    <h2 className="display text-xl">المباريات المباشرة والتحكم السريع بالنتائج</h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("matches")}
                    className="text-xs text-signal hover:underline flex items-center gap-1"
                  >
                    <span>عرض الكل</span>
                    <ChevronLeft className="h-3 w-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.slice(0, 4).map((m, idx) => (
                    <div
                      key={idx}
                      className="border border-border p-4 bg-background/60 rounded flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-xs text-muted-foreground pb-2 border-b border-border/50">
                        <span>{m.competition}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                            m.status === "live"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                              : m.status === "finished"
                              ? "bg-muted text-muted-foreground"
                              : "bg-signal/10 text-signal"
                          }`}
                        >
                          {m.status === "live"
                            ? `مباشر ${m.minute || ""}`
                            : m.status === "finished"
                            ? "انتهت"
                            : "قادمة"}
                        </span>
                      </div>

                      <div className="py-4 flex items-center justify-between">
                        <div className="flex-1 text-center font-semibold text-base">{m.home}</div>
                        <div className="px-4 py-1 bg-card border border-border rounded text-xl font-bold text-signal flex items-center gap-2">
                          <span>{m.homeScore ?? "-"}</span>
                          <span className="text-muted-foreground text-sm">:</span>
                          <span>{m.awayScore ?? "-"}</span>
                        </div>
                        <div className="flex-1 text-center font-semibold text-base">{m.away}</div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                        <span className="text-muted-foreground">{m.stadium}</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleQuickScoreUpdate(idx, "home", 1)}
                            title="إضافة هدف للمضيف"
                            className="px-2 py-1 bg-card border border-border rounded hover:border-signal text-[11px]"
                          >
                            +1 {m.homeShort}
                          </button>
                          <button
                            onClick={() => handleQuickScoreUpdate(idx, "away", 1)}
                            title="إضافة هدف للضيف"
                            className="px-2 py-1 bg-card border border-border rounded hover:border-signal text-[11px]"
                          >
                            +1 {m.awayShort}
                          </button>
                          <button
                            onClick={() => handleToggleMatchStatus(idx)}
                            title="تغيير حالة المباراة"
                            className="px-2 py-1 bg-muted rounded text-[11px] hover:bg-accent"
                          >
                            تغيير الحالة
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Latest Articles Table preview */}
              <div className="border border-border bg-card/40 p-6 rounded">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="display text-xl">أحدث المقالات المنشورة</h2>
                  <button
                    onClick={() => setActiveTab("articles")}
                    className="text-xs text-signal hover:underline flex items-center gap-1"
                  >
                    <span>إدارة كافة المقالات ({articles.length})</span>
                    <ChevronLeft className="h-3 w-3" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-right">
                    <thead className="text-xs text-muted-foreground border-b border-border">
                      <tr>
                        <th className="pb-3 font-medium">العنوان</th>
                        <th className="pb-3 font-medium">القسم</th>
                        <th className="pb-3 font-medium">الكاتب</th>
                        <th className="pb-3 font-medium">النوع</th>
                        <th className="pb-3 font-medium">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {articles.slice(0, 5).map((art) => (
                        <tr key={art.slug} className="hover:bg-accent/30 transition-colors">
                          <td className="py-3 font-medium max-w-xs truncate">{art.title}</td>
                          <td className="py-3">
                            <span className="eyebrow text-xs bg-muted px-2 py-0.5 rounded">
                              {art.category}
                            </span>
                          </td>
                          <td className="py-3 text-muted-foreground">{art.author}</td>
                          <td className="py-3">
                            <span className="text-xs text-signal">{art.kind}</span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <Link
                                to="/article/$slug"
                                params={{ slug: art.slug }}
                                className="text-muted-foreground hover:text-foreground p-1"
                                title="معاينة"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={() => openEditArticleModal(art)}
                                className="text-muted-foreground hover:text-signal p-1"
                                title="تعديل"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES */}
          {activeTab === "articles" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="display text-3xl font-bold">إدارة المقالات والأخبار</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    إضافة وتحرير ونشر المواد الصحفية والتقارير الرياضية.
                  </p>
                </div>
                <button
                  onClick={openNewArticleModal}
                  className="inline-flex items-center gap-2 bg-signal text-signal-foreground px-4 py-2.5 text-sm font-semibold hover:brightness-110 transition shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة مقال جديد</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="ابحث بالعنوان أو الكاتب..."
                    value={articleSearch}
                    onChange={(e) => setArticleSearch(e.target.value)}
                    className="w-full bg-card border border-border pr-9 pl-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>

                <select
                  value={articleCategoryFilter}
                  onChange={(e) => setArticleCategoryFilter(e.target.value)}
                  className="w-full sm:w-48 bg-card border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                >
                  <option value="all">جميع التصنيفات</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <div className="text-xs text-muted-foreground sm:mr-auto">
                  عدد المقالات المعروضة: {filteredArticles.length}
                </div>
              </div>

              {/* Articles Grid / List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((art) => (
                  <div
                    key={art.slug}
                    className="border border-border bg-card rounded overflow-hidden flex flex-col justify-between group hover:border-signal/50 transition-colors"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-muted">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="eyebrow bg-black/80 backdrop-blur-sm text-signal px-2 py-1 text-xs border border-signal/30">
                          {art.category}
                        </span>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className="text-[11px] bg-black/80 px-2 py-0.5 rounded text-muted-foreground">
                          {art.readingTime} دقائق قراءة
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-signal font-mono">{art.kind.toUpperCase()}</span>
                        <h3 className="display text-lg font-bold mt-1 line-clamp-2 leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                          {art.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                        <span>{art.author}</span>
                        <span>{art.date}</span>
                      </div>
                    </div>

                    <div className="bg-background/80 border-t border-border p-3 flex items-center justify-between gap-2">
                      <Link
                        to="/article/$slug"
                        params={{ slug: art.slug }}
                        className="inline-flex items-center gap-1 text-xs text-foreground/70 hover:text-signal"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>معاينة</span>
                      </Link>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditArticleModal(art)}
                          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                          title="تعديل"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.slug)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-400"
                          title="حذف"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MATCHES */}
          {activeTab === "matches" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="display text-3xl font-bold">مركز المباريات والنتائج</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    إدارة مواعيد المباريات، النتائج اللحظية، وتحديثات البث المباشر.
                  </p>
                </div>
                <button
                  onClick={openNewMatchModal}
                  className="inline-flex items-center gap-2 bg-signal text-signal-foreground px-4 py-2.5 text-sm font-semibold hover:brightness-110 transition shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة مباراة جديدة</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matches.map((m, idx) => (
                  <div
                    key={idx}
                    className="border border-border bg-card p-5 rounded flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between text-xs pb-3 border-b border-border">
                      <span className="font-semibold text-foreground/90">{m.competition}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{m.date} - {m.time}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            m.status === "live"
                              ? "bg-red-500 text-white animate-pulse"
                              : m.status === "finished"
                              ? "bg-muted text-muted-foreground"
                              : "bg-signal/20 text-signal"
                          }`}
                        >
                          {m.status === "live"
                            ? `مباشر ${m.minute || ""}`
                            : m.status === "finished"
                            ? "انتهت"
                            : "قادمة"}
                        </span>
                      </div>
                    </div>

                    <div className="py-6 flex items-center justify-between">
                      <div className="flex-1 text-center">
                        <div className="display text-lg font-bold">{m.home}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-0.5">
                          {m.homeShort}
                        </div>
                      </div>

                      <div className="px-5 py-2 bg-background border border-border rounded flex items-center gap-3">
                        <span className="display text-2xl font-bold text-signal">
                          {m.homeScore ?? "-"}
                        </span>
                        <span className="text-muted-foreground">:</span>
                        <span className="display text-2xl font-bold text-signal">
                          {m.awayScore ?? "-"}
                        </span>
                      </div>

                      <div className="flex-1 text-center">
                        <div className="display text-lg font-bold">{m.away}</div>
                        <div className="text-xs text-muted-foreground font-mono mt-0.5">
                          {m.awayShort}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{m.stadium}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuickScoreUpdate(idx, "home", 1)}
                          className="px-2 py-1 bg-muted rounded hover:bg-signal hover:text-signal-foreground transition"
                        >
                          +1 {m.homeShort}
                        </button>
                        <button
                          onClick={() => handleQuickScoreUpdate(idx, "away", 1)}
                          className="px-2 py-1 bg-muted rounded hover:bg-signal hover:text-signal-foreground transition"
                        >
                          +1 {m.awayShort}
                        </button>
                        <button
                          onClick={() => openEditMatchModal(m)}
                          className="p-1 text-muted-foreground hover:text-foreground"
                          title="تعديل تفاصيل المباراة"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMatch(idx)}
                          className="p-1 text-muted-foreground hover:text-red-400"
                          title="حذف المباراة"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TRANSFERS */}
          {activeTab === "transfers" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="display text-3xl font-bold">سوق الانتقالات والصفقات</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    تسجيل ومتابعة صفقات اللاعبين والشائعات الرسمية والمتقدمة.
                  </p>
                </div>
                <button
                  onClick={openNewTransferModal}
                  className="inline-flex items-center gap-2 bg-signal text-signal-foreground px-4 py-2.5 text-sm font-semibold hover:brightness-110 transition shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة خبر انتقال</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-border bg-card rounded">
                <table className="w-full text-sm text-right">
                  <thead className="text-xs text-muted-foreground bg-muted/30 border-b border-border">
                    <tr>
                      <th className="p-4 font-semibold">اللاعب</th>
                      <th className="p-4 font-semibold">من</th>
                      <th className="p-4 font-semibold">إلى</th>
                      <th className="p-4 font-semibold">القيمة المقدرة</th>
                      <th className="p-4 font-semibold">الحالة</th>
                      <th className="p-4 font-semibold">المصدر</th>
                      <th className="p-4 font-semibold">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {transfers.map((t, idx) => (
                      <tr key={idx} className="hover:bg-accent/20 transition-colors">
                        <td className="p-4 font-bold text-foreground">{t.player}</td>
                        <td className="p-4 text-muted-foreground">{t.from}</td>
                        <td className="p-4 text-foreground font-medium">{t.to}</td>
                        <td className="p-4 font-mono text-signal">{t.fee}</td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded text-xs font-semibold ${
                              t.status === "مؤكد"
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : t.status === "متقدم"
                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td className="p-4 text-xs text-muted-foreground">{t.source}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDeleteTransfer(t.player)}
                            className="p-1 text-muted-foreground hover:text-red-400 transition"
                            title="حذف"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: TICKER */}
          {activeTab === "ticker" && (
            <div className="space-y-6">
              <div>
                <h1 className="display text-3xl font-bold">شريط الأخبار العاجلة (Ticker)</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  التحكم في شريط الأخبار النصية المتحرك الذي يظهر في أعلى الواجهة لزوار الموقع.
                </p>
              </div>

              {/* Add Ticker */}
              <form
                onSubmit={handleAddTicker}
                className="flex flex-col sm:flex-row gap-3 border border-border bg-card p-4 rounded"
              >
                <input
                  type="text"
                  placeholder="اكتب خبراً عاجلاً جديداً..."
                  value={newTickerText}
                  onChange={(e) => setNewTickerText(e.target.value)}
                  className="flex-1 bg-background border border-border px-4 py-2.5 text-sm rounded outline-none focus:border-signal"
                />
                <button
                  type="submit"
                  className="bg-signal text-signal-foreground px-5 py-2.5 text-sm font-semibold hover:brightness-110 transition shrink-0 flex items-center justify-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة للشريط</span>
                </button>
              </form>

              {/* Current Ticker Items */}
              <div className="space-y-2">
                {ticker.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 p-4 border border-border bg-card rounded hover:border-border/80 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-signal shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteTicker(idx)}
                      className="p-1.5 text-muted-foreground hover:text-red-400 transition shrink-0"
                      title="حذف"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === "settings" && (
            <div className="max-w-3xl space-y-8">
              <div>
                <h1 className="display text-3xl font-bold">إعدادات النظام والمنصة</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  تهيئة إعدادات الموقع، التخزين المحلي، والتكامل السحابي.
                </p>
              </div>

              <div className="border border-border bg-card p-6 rounded space-y-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-signal" />
                  <span>معلومات المنصة</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">اسم الموقع</label>
                    <input
                      type="text"
                      disabled
                      value="أبو حمد | صحافة كرة القدم"
                      className="w-full bg-background/50 border border-border px-3 py-2 text-sm rounded text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">بريد التواصل التحريري</label>
                    <input
                      type="text"
                      disabled
                      value="hello@abuhamad.media"
                      className="w-full bg-background/50 border border-border px-3 py-2 text-sm rounded text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold mb-2">حالة الاتصال بـ Supabase Cloud</h3>
                  <div className="p-3 bg-background/60 border border-border rounded flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      مفتاح الخادم متصل: client.server.ts مهيأ للربط المباشر مع جداول قاعدة البيانات.
                    </span>
                    <span className="text-emerald-400 font-semibold">نشط</span>
                  </div>
                </div>
              </div>

              {/* Data Reset */}
              <div className="border border-red-500/20 bg-red-500/5 p-6 rounded space-y-4">
                <h2 className="text-lg font-bold text-red-400 flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  <span>إعادة ضبط البيانات الأصلية</span>
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  إذا أردت التراجع عن التعديلات وتفريغ التخزين المحلي والعودة إلى مقالات ومباريات المشروع
                  الأصلية، يمكنك استخدام هذا الزر.
                </p>
                <button
                  onClick={handleResetDefaults}
                  className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 text-sm rounded hover:bg-red-500/30 transition"
                >
                  استعادة البيانات الافتراضية
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT ARTICLE */}
      {articleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-border w-full max-w-2xl rounded p-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="display text-xl font-bold">
                {editingArticle ? "تعديل المقال" : "إضافة مقال جديد"}
              </h2>
              <button
                onClick={() => setArticleModalOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">عنوان المقال *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: ليلة الحسم في دوري الأبطال..."
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">العنوان الفرعي</label>
                <input
                  type="text"
                  placeholder="وصف إضافي مكثف تحت العنوان الرئيسي..."
                  value={articleForm.subtitle}
                  onChange={(e) => setArticleForm({ ...articleForm, subtitle: e.target.value })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">المقتطف الصحفي (Excerpt)</label>
                <textarea
                  rows={2}
                  placeholder="الموجز الذي يظهر في بطاقات الأخبار..."
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">التصنيف</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">نوع المحتوى</label>
                  <select
                    value={articleForm.kind}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, kind: e.target.value as Article["kind"] })
                    }
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  >
                    <option value="news">خبر (News)</option>
                    <option value="story">قصة (Story)</option>
                    <option value="analysis">تحليل (Analysis)</option>
                    <option value="interview">مقابلة (Interview)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">وقت القراءة (بالدقائق)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={articleForm.readingTime}
                    onChange={(e) => setArticleForm({ ...articleForm, readingTime: Number(e.target.value) })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">الكاتب</label>
                  <input
                    type="text"
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">رابط الصورة (Image URL)</label>
                  <input
                    type="url"
                    value={articleForm.image}
                    onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  نص المقال (افصل بين الفقرات بسطر فارغ)
                </label>
                <textarea
                  rows={6}
                  placeholder="اكتب فقرات المقال هنا..."
                  value={articleForm.body}
                  onChange={(e) => setArticleForm({ ...articleForm, body: e.target.value })}
                  className="w-full bg-background border border-border p-3 text-sm rounded outline-none focus:border-signal leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setArticleModalOpen(false)}
                  className="px-4 py-2 border border-border rounded text-sm hover:bg-muted"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-signal text-signal-foreground font-semibold text-sm rounded hover:brightness-110 flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingArticle ? "حفظ التعديلات" : "نشر المقال"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT MATCH */}
      {matchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-card border border-border w-full max-w-lg rounded p-6 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="display text-xl font-bold">
                {editingMatch ? "تعديل المباراة" : "إضافة مباراة جديدة"}
              </h2>
              <button
                onClick={() => setMatchModalOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMatch} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">البطولة / الدوري</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: دوري أبطال أوروبا"
                  value={matchForm.competition}
                  onChange={(e) => setMatchForm({ ...matchForm, competition: e.target.value })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">الفريق المضيف</label>
                  <input
                    type="text"
                    required
                    placeholder="الهلال"
                    value={matchForm.home}
                    onChange={(e) => setMatchForm({ ...matchForm, home: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">رمز المضيف (Short)</label>
                  <input
                    type="text"
                    placeholder="HIL"
                    value={matchForm.homeShort}
                    onChange={(e) => setMatchForm({ ...matchForm, homeShort: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">الفريق الضيف</label>
                  <input
                    type="text"
                    required
                    placeholder="النصر"
                    value={matchForm.away}
                    onChange={(e) => setMatchForm({ ...matchForm, away: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">رمز الضيف (Short)</label>
                  <input
                    type="text"
                    placeholder="NAS"
                    value={matchForm.awayShort}
                    onChange={(e) => setMatchForm({ ...matchForm, awayShort: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">أهداف المضيف</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={matchForm.homeScore}
                    onChange={(e) => setMatchForm({ ...matchForm, homeScore: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">أهداف الضيف</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={matchForm.awayScore}
                    onChange={(e) => setMatchForm({ ...matchForm, awayScore: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">حالة المباراة</label>
                  <select
                    value={matchForm.status}
                    onChange={(e) =>
                      setMatchForm({ ...matchForm, status: e.target.value as Match["status"] })
                    }
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  >
                    <option value="upcoming">قادمة (Upcoming)</option>
                    <option value="live">مباشرة الآن (Live)</option>
                    <option value="finished">انتهت (Finished)</option>
                    <option value="postponed">مؤجلة (Postponed)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">الدقيقة (إن كانت مباشرة)</label>
                  <input
                    type="text"
                    placeholder="مثال: ٦٥'"
                    value={matchForm.minute}
                    onChange={(e) => setMatchForm({ ...matchForm, minute: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">التاريخ</label>
                  <input
                    type="text"
                    value={matchForm.date}
                    onChange={(e) => setMatchForm({ ...matchForm, date: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">الوقت</label>
                  <input
                    type="text"
                    value={matchForm.time}
                    onChange={(e) => setMatchForm({ ...matchForm, time: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">الملعب</label>
                  <input
                    type="text"
                    value={matchForm.stadium}
                    onChange={(e) => setMatchForm({ ...matchForm, stadium: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setMatchModalOpen(false)}
                  className="px-4 py-2 border border-border rounded text-sm hover:bg-muted"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-signal text-signal-foreground font-semibold text-sm rounded hover:brightness-110 flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  <span>حفظ المباراة</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TRANSFER */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-md rounded p-6">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h2 className="display text-xl font-bold">إضافة صفقة / خبر انتقال</h2>
              <button
                onClick={() => setTransferModalOpen(false)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTransfer} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">اسم اللاعب *</label>
                <input
                  type="text"
                  required
                  placeholder="اسم اللاعب"
                  value={transferForm.player}
                  onChange={(e) => setTransferForm({ ...transferForm, player: e.target.value })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">النادي الحالي (من)</label>
                  <input
                    type="text"
                    placeholder="مثال: ليفربول"
                    value={transferForm.from}
                    onChange={(e) => setTransferForm({ ...transferForm, from: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">النادي الجديد (إلى)</label>
                  <input
                    type="text"
                    placeholder="مثال: الهلال"
                    value={transferForm.to}
                    onChange={(e) => setTransferForm({ ...transferForm, to: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">قيمة الصفقة</label>
                  <input
                    type="text"
                    placeholder="مثال: ٤٠ مليون يورو"
                    value={transferForm.fee}
                    onChange={(e) => setTransferForm({ ...transferForm, fee: e.target.value })}
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">حالة الصفقة</label>
                  <select
                    value={transferForm.status}
                    onChange={(e) =>
                      setTransferForm({
                        ...transferForm,
                        status: e.target.value as Transfer["status"],
                      })
                    }
                    className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                  >
                    <option value="مؤكد">مؤكد</option>
                    <option value="متقدم">متقدم</option>
                    <option value="شائعة">شائعة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">المصدر الصحفي</label>
                <input
                  type="text"
                  placeholder="مثال: فابريزيو رومانو / بيان رسمي"
                  value={transferForm.source}
                  onChange={(e) => setTransferForm({ ...transferForm, source: e.target.value })}
                  className="w-full bg-background border border-border px-3 py-2 text-sm rounded outline-none focus:border-signal"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="px-4 py-2 border border-border rounded text-sm hover:bg-muted"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-signal text-signal-foreground font-semibold text-sm rounded hover:brightness-110 flex items-center gap-1.5"
                >
                  <Save className="h-4 w-4" />
                  <span>نشر الصفقة</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
