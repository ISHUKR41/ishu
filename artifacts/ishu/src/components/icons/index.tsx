// ============================================================================
// FILE: index.tsx
// MODULE: Core
// PURPOSE: This file provides the implementation for index.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================

/**
 * Professional Icon System
 * Centralized icon exports using react-icons library
 * Provides enterprise-grade icons from multiple professional sources
 *
 * This replaces lucide-react with professional alternatives from:
 * - Heroicons (modern, clean)
 * - Font Awesome (comprehensive, professional)
 * - Material Design Icons (Google's design system)
 * - Remix Icons (open-source professional)
 */

// Heroicons 2 (Outline style - modern, professional)
import {
  HomeIcon,
  NewspaperIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  BellIcon,
  UserCircleIcon,
  PhoneIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CheckIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
  EnvelopeIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  DocumentTextIcon,
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  CogIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  UserIcon,
  UsersIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  LinkIcon,
  PaperClipIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon,
  MinusIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
  EyeIcon,
  EyeSlashIcon,
  SunIcon,
  MoonIcon,
  BoltIcon,
  FireIcon,
  SparklesIcon,
  TrophyIcon,
  RocketLaunchIcon,
  BeakerIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  HandRaisedIcon,
  CpuChipIcon,
  CircleStackIcon,
  ServerIcon,
  CloudIcon,
  CommandLineIcon,
  CubeIcon,
  Square3Stack3DIcon,
  RectangleStackIcon,
  QueueListIcon,
  ListBulletIcon,
  TableCellsIcon,
  ChartBarIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  CalculatorIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  FolderIcon,
  FolderOpenIcon,
  ArchiveBoxIcon,
  InboxIcon,
  PaperAirplaneIcon,
  AtSymbolIcon,
  HashtagIcon,
  TagIcon,
  BookOpenIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  ForwardIcon,
  BackwardIcon,
  ArrowPathIcon,
  SignalIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
  TvIcon,
  PrinterIcon,
  CameraIcon,
  Battery100Icon,
  BanknotesIcon,
  CreditCardIcon,
  ReceiptPercentIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  GiftIcon,
  TicketIcon,
  FlagIcon,
  BellAlertIcon,
  BellSlashIcon,
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon as InfoIcon,
  NoSymbolIcon,
  ShieldExclamationIcon,
  KeyIcon,
  FingerPrintIcon,
  IdentificationIcon,
  CreditCardIcon as CardIcon,
  BanknotesIcon as MoneyIcon,
  CurrencyDollarIcon,
  ReceiptRefundIcon,
  ScaleIcon,
  BriefcaseIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  BuildingLibraryIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

// Font Awesome (via react-icons)
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaTelegram,
  FaGithub,
  FaGoogle,
  FaMicrosoft,
  FaAmazon,
  FaApple,
  FaAndroid,
} from 'react-icons/fa';

import {
  FaXTwitter,
  FaThreads,
  FaTiktok,
  FaDiscord,
  FaSlack,
  FaReddit,
} from 'react-icons/fa6';

// Material Design Icons (via react-icons)
import {
  MdDashboard,
  MdAnalytics,
  MdInsights,
  MdTrendingUp,
  MdTrendingDown,
  MdSpeed,
  MdSecurity,
  MdVerified,
  MdNotifications,
  MdNotificationsActive,
  MdNotificationsOff,
  MdSettings,
  MdAccountCircle,
  MdLogout,
  MdLogin,
  MdPersonAdd,
  MdGroup,
  MdSupervisorAccount,
  MdAdminPanelSettings,
  MdManageAccounts,
} from 'react-icons/md';

// Remix Icons (via react-icons)
import {
  RiGraduationCapLine,
  RiBookOpenLine,
  RiFilePdfLine,
  RiFileWordLine,
  RiFileExcelLine,
  RiFilePptLine,
  RiFileImageLine,
  RiFileVideoLine,
  RiFileMusicLine,
  RiFileZipLine,
  RiFileTextLine,
  RiFileUploadLine,
  RiFileDownloadLine,
  RiRobotLine,
  RiBrainLine,
  RiMagicLine,
  RiSparklingLine,
} from 'react-icons/ri';

// Bootstrap Icons (via react-icons)
import {
  BsStars,
  BsRocket,
  BsTrophy,
  BsLightning,
  BsFire,
  BsEmojiSmile,
  BsEmojiHeartEyes,
  BsEmojiFrown,
} from 'react-icons/bs';

/**
 * Centralized Icon Exports
 * Use these throughout the application for consistency
 */
export const Icons = {
  // Navigation
  Home: HomeIcon,
  News: NewspaperIcon,
  Tools: WrenchScrewdriverIcon,
  Results: AcademicCapIcon,
  Blog: RiBookOpenLine,
  Resources: RiBookOpenLine,
  Contact: PhoneIcon,
  About: InformationCircleIcon,

  // UI Controls
  Search: MagnifyingGlassIcon,
  Menu: Bars3Icon,
  Close: XMarkIcon,
  ChevronDown: ChevronDownIcon,
  ChevronUp: ChevronUpIcon,
  ChevronRight: ChevronRightIcon,
  ChevronLeft: ChevronLeftIcon,
  ArrowRight: ArrowRightIcon,
  ArrowLeft: ArrowLeftIcon,
  ArrowUp: ArrowUpIcon,
  ArrowDown: ArrowDownIcon,

  // Actions
  Check: CheckIcon,
  Plus: PlusIcon,
  Minus: MinusIcon,
  Edit: PencilIcon,
  Delete: TrashIcon,
  Download: ArrowDownTrayIcon,
  Upload: ArrowUpTrayIcon,
  Share: ShareIcon,
  Bookmark: BookmarkIcon,
  Heart: HeartIcon,
  Star: StarIcon,

  // Status
  Success: CheckCircleIcon,
  Error: XCircleIcon,
  Warning: ExclamationTriangleIcon,
  Info: InfoIcon,
  Loading: ArrowPathIcon,
  Clock: ClockIcon,

  // User & Account
  User: UserIcon,
  Users: UsersIcon,
  UserCircle: UserCircleIcon,
  Account: MdAccountCircle,
  Login: MdLogin,
  Logout: MdLogout,
  Register: MdPersonAdd,
  Admin: MdAdminPanelSettings,

  // Communication
  Bell: BellIcon,
  BellAlert: BellAlertIcon,
  BellOff: BellSlashIcon,
  Mail: EnvelopeIcon,
  Chat: ChatBubbleLeftRightIcon,
  Phone: PhoneIcon,
  WhatsApp: FaWhatsapp,
  Telegram: FaTelegram,

  // Files & Documents
  Document: DocumentTextIcon,
  PDF: RiFilePdfLine,
  Word: RiFileWordLine,
  Excel: RiFileExcelLine,
  PowerPoint: RiFilePptLine,
  Image: RiFileImageLine,
  Video: RiFileVideoLine,
  Folder: FolderIcon,
  FolderOpen: FolderOpenIcon,
  Archive: ArchiveBoxIcon,

  // Education & Learning
  Graduation: RiGraduationCapLine,
  Book: BookOpenIcon,
  BookOpen: RiBookOpenLine,
  Academic: AcademicCapIcon,
  Certificate: IdentificationIcon,
  Trophy: TrophyIcon,

  // Technology & AI
  AI: RiRobotLine,
  Brain: RiBrainLine,
  Magic: RiMagicLine,
  Sparkles: SparklesIcon,
  Sparkling: RiSparklingLine,
  CPU: CpuChipIcon,
  Server: ServerIcon,
  Cloud: CloudIcon,
  Code: CodeBracketIcon,

  // Settings & Configuration
  Settings: CogIcon,
  Adjustments: AdjustmentsHorizontalIcon,
  Filter: FunnelIcon,
  Shield: ShieldCheckIcon,
  Lock: LockClosedIcon,
  Key: KeyIcon,
  Security: MdSecurity,

  // Social Media
  Facebook: FaFacebook,
  Twitter: FaXTwitter,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  YouTube: FaYoutube,
  GitHub: FaGithub,
  Discord: FaDiscord,
  Slack: FaSlack,
  Reddit: FaReddit,
  TikTok: FaTiktok,
  Threads: FaThreads,

  // Companies
  Google: FaGoogle,
  Microsoft: FaMicrosoft,
  Amazon: FaAmazon,
  Apple: FaApple,
  Android: FaAndroid,

  // Dashboard & Analytics
  Dashboard: MdDashboard,
  Analytics: MdAnalytics,
  Insights: MdInsights,
  TrendingUp: MdTrendingUp,
  TrendingDown: MdTrendingDown,
  Chart: ChartBarIcon,
  ChartBar: ChartBarIcon,
  ChartPie: ChartPieIcon,
  Presentation: PresentationChartLineIcon,
  Calculator: CalculatorIcon,

  // Miscellaneous
  Calendar: CalendarIcon,
  Location: MapPinIcon,
  Globe: GlobeAltIcon,
  Link: LinkIcon,
  Eye: EyeIcon,
  EyeOff: EyeSlashIcon,
  Sun: SunIcon,
  Moon: MoonIcon,
  Bolt: BoltIcon,
  Fire: FireIcon,
  Rocket: RocketLaunchIcon,
  Gift: GiftIcon,
  Verified: MdVerified,

  // Emojis & Reactions
  Smile: BsEmojiSmile,
  HeartEmoji: BsEmojiHeartEyes,
  Stars: BsStars,
  Lightning: BsLightning,

  // Building & Organization
  Building: BuildingOfficeIcon,
  Office: BuildingOffice2Icon,
  Library: BuildingLibraryIcon,
  Store: BuildingStorefrontIcon,

  // Media Controls
  Play: PlayIcon,
  Pause: PauseIcon,
  Stop: StopIcon,
  Forward: ForwardIcon,
  Backward: BackwardIcon,

  // Devices
  Mobile: DevicePhoneMobileIcon,
  Tablet: DeviceTabletIcon,
  Desktop: ComputerDesktopIcon,
  TV: TvIcon,
  Camera: CameraIcon,
  Printer: PrinterIcon,

  // Commerce
  ShoppingCart: ShoppingCartIcon,
  ShoppingBag: ShoppingBagIcon,
  CreditCard: CreditCardIcon,
  Money: BanknotesIcon,
  Dollar: CurrencyDollarIcon,
  Receipt: ReceiptPercentIcon,

  // Others
  Question: QuestionMarkCircleIcon,
  Flag: FlagIcon,
  Tag: TagIcon,
  Scale: ScaleIcon,
  Hashtag: HashtagIcon,
  At: AtSymbolIcon,
  List: ListBulletIcon,
  Grid: TableCellsIcon,
  Stack: RectangleStackIcon,
  Cube: CubeIcon,
  Layers: Square3Stack3DIcon,
};

// Export individual icons for direct use
export {
  // Heroicons
  HomeIcon,
  NewspaperIcon,
  WrenchScrewdriverIcon,
  AcademicCapIcon,
  BellIcon,
  UserCircleIcon,
  PhoneIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  StarIcon,
  CheckIcon,
  // Font Awesome
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaWhatsapp,
  FaGithub,
  // Material Design
  MdDashboard,
  MdAnalytics,
  MdSecurity,
  MdVerified,
  // Remix Icons
  RiGraduationCapLine,
  RiBookOpenLine,
  RiFilePdfLine,
  RiRobotLine,
  RiBrainLine,
  // Bootstrap Icons
  BsStars,
  BsRocket,
  BsTrophy,
};

export default Icons;
