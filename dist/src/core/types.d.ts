export declare enum OverlayType {
    TEXT = "text",
    IMAGE = "image",
    SHAPE = "shape",
    VIDEO = "clip",
    SOUND = "sound",
    CAPTION = "caption",
    MY_EDITS = "My Edits",
    TEXT_ELEMENTS = "Text Panel",
    CAPTIONS = "Captions Panel",
    MY_UPLOADS = "My Uploads",
    SOUNDS = "Audio Panel",
    SHAPES = "Shapes Panel",
    PEXEL_CLIPS = "Pexel Clips",
    PEXEL_IMAGES = "Pexel Images",
    RENDER_HISTORY = "Render History",
    SHARING_MANAGEMENT = "Sharing Management",
    LOCAL_DIR = "local-dir",
    STICKER = "sticker"
}
type BaseOverlay = {
    id: number;
    durationInFrames: number;
    from: number;
    height: number;
    row: number;
    left: number;
    top: number;
    width: number;
    isDragging: boolean;
    rotation: number;
    type: OverlayType;
    name?: string;
};
type BaseStyles = {
    opacity?: number;
    zIndex?: number;
    transform?: string;
};
type AnimationConfig = {
    enter?: string;
    exit?: string;
};
export type TextOverlay = BaseOverlay & {
    type: OverlayType.TEXT;
    content: string;
    styles: BaseStyles & {
        fontSize: string;
        fontWeight: string;
        color: string;
        backgroundColor: string;
        fontFamily: string;
        fontStyle: string;
        textDecoration: string;
        lineHeight?: string;
        letterSpacing?: string;
        textAlign?: "left" | "center" | "right";
        textShadow?: string;
        zIndex?: number;
        padding?: string;
        paddingBackgroundColor?: string;
        borderRadius?: string;
        boxShadow?: string;
        background?: string;
        WebkitBackgroundClip?: string;
        WebkitTextFillColor?: string;
        backdropFilter?: string;
        border?: string;
        animation?: AnimationConfig;
    };
};
export type ShapeOverlay = BaseOverlay & {
    type: OverlayType.SHAPE;
    content: string;
    styles: BaseStyles & {
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        borderRadius?: string;
        boxShadow?: string;
        gradient?: string;
    };
};
export type ClipOverlay = BaseOverlay & {
    type: OverlayType.VIDEO;
    name: string;
    content: string;
    src: string;
    videoStartTime?: number;
    speed?: number;
    styles: BaseStyles & {
        objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
        objectPosition?: string;
        volume?: number;
        borderRadius?: string;
        filter?: string;
        boxShadow?: string;
        border?: string;
        padding?: string;
        paddingBackgroundColor?: string;
        animation?: AnimationConfig;
    };
};
export type SoundOverlay = BaseOverlay & {
    type: OverlayType.SOUND;
    content: string;
    src: string;
    startFromSound?: number;
    styles: BaseStyles & {
        volume?: number;
    };
};
export type CaptionWord = {
    word: string;
    startMs: number;
    endMs: number;
    confidence: number;
};
export type Caption = {
    text: string;
    startMs: number;
    endMs: number;
    timestampMs: number | null;
    confidence: number | null;
    words: CaptionWord[];
};
export interface CaptionStyles {
    fontFamily: string;
    fontSize: string;
    lineHeight: number;
    textAlign: "left" | "center" | "right";
    color: string;
    backgroundColor?: string;
    background?: string;
    backdropFilter?: string;
    padding?: string;
    fontWeight?: number | string;
    letterSpacing?: string;
    textShadow?: string;
    borderRadius?: string;
    transition?: string;
    highlightStyle?: {
        backgroundColor?: string;
        color?: string;
        scale?: number;
        fontWeight?: number;
        textShadow?: string;
        padding?: string;
        borderRadius?: string;
        transition?: string;
        background?: string;
        border?: string;
        backdropFilter?: string;
    };
}
export interface CaptionOverlay extends BaseOverlay {
    type: OverlayType.CAPTION;
    captions: Caption[];
    styles?: CaptionStyles;
    template?: string;
}
export type StickerCategory = "Shapes" | "Discounts" | "Emojis" | "Reviews" | "Default";
export type StickerOverlay = BaseOverlay & {
    type: OverlayType.STICKER;
    content: string;
    category: StickerCategory;
    styles: BaseStyles & {
        fill?: string;
        stroke?: string;
        strokeWidth?: number;
        scale?: number;
        filter?: string;
        animation?: AnimationConfig;
    };
};
export type Overlay = TextOverlay | ImageOverlay | ShapeOverlay | ClipOverlay | SoundOverlay | CaptionOverlay | StickerOverlay;
export type MainProps = {
    readonly overlays: Overlay[];
    readonly setSelectedOverlay: React.Dispatch<React.SetStateAction<number | null>>;
    readonly selectedOverlay: number | null;
    readonly changeOverlay: (overlayId: number, updater: (overlay: Overlay) => Overlay) => void;
};
import { z } from "zod";
interface TimelineItem {
    id: string;
    start: number;
    duration: number;
    row: number;
}
export interface Video extends TimelineItem {
    type: OverlayType.VIDEO;
    src: string;
    videoStartTime?: number;
}
export interface Sound extends TimelineItem {
    type: OverlayType.SOUND;
    file: string;
    content: string;
    startFromSound: number;
}
interface Layer extends TimelineItem {
    position: {
        x: number;
        y: number;
    };
}
export interface TextLayer extends Layer {
    type: OverlayType.TEXT;
    text: string;
    fontSize: number;
    fontColor: string;
    fontFamily: string;
    backgroundColor: string;
}
export interface ShapeLayer extends Layer {
    type: OverlayType.SHAPE;
    shapeType: "rectangle" | "circle" | "triangle";
    color: string;
    size: {
        width: number;
        height: number;
    };
}
export interface ImageLayer extends Layer {
    type: OverlayType.IMAGE;
    src: string;
    size: {
        width: number;
        height: number;
    };
}
export type LayerItem = TextLayer | ShapeLayer | ImageLayer;
export type TimelineItemUnion = Video | Sound | LayerItem;
export type SelectedItem = TimelineItemUnion | null;
export declare const CompositionProps: z.ZodObject<{
    overlays: z.ZodArray<z.ZodAny, "many">;
    durationInFrames: z.ZodNumber;
    width: z.ZodNumber;
    height: z.ZodNumber;
    fps: z.ZodNumber;
    src: z.ZodString;
}, "strip", z.ZodTypeAny, {
    src: string;
    overlays: any[];
    durationInFrames: number;
    width: number;
    height: number;
    fps: number;
}, {
    src: string;
    overlays: any[];
    durationInFrames: number;
    width: number;
    height: number;
    fps: number;
}>;
export declare const RenderRequest: z.ZodObject<{
    id: z.ZodString;
    inputProps: z.ZodObject<{
        overlays: z.ZodArray<z.ZodAny, "many">;
        durationInFrames: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
        fps: z.ZodNumber;
        src: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        src: string;
        overlays: any[];
        durationInFrames: number;
        width: number;
        height: number;
        fps: number;
    }, {
        src: string;
        overlays: any[];
        durationInFrames: number;
        width: number;
        height: number;
        fps: number;
    }>;
}, "strip", z.ZodTypeAny, {
    inputProps: {
        src: string;
        overlays: any[];
        durationInFrames: number;
        width: number;
        height: number;
        fps: number;
    };
    id: string;
}, {
    inputProps: {
        src: string;
        overlays: any[];
        durationInFrames: number;
        width: number;
        height: number;
        fps: number;
    };
    id: string;
}>;
export declare const ProgressRequest: z.ZodObject<{
    bucketName: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    bucketName: string;
}, {
    id: string;
    bucketName: string;
}>;
export type ProgressResponse = {
    type: "error";
    message: string;
} | {
    type: "progress";
    progress: number;
} | {
    type: "done";
    url: string;
    size: number;
};
export interface PexelsMedia {
    id: string;
    duration?: number;
    image?: string;
    video_files?: {
        link: string;
    }[];
}
export interface PexelsAudio {
    id: string;
    title: string;
    artist: string;
    audio_url: string;
    duration: number;
}
export interface LocalSound {
    id: string;
    title: string;
    artist: string;
    file: string;
    duration: number;
}
export interface LocalShape {
    id: string;
    title: string;
    src: string;
    duration: number;
}
export type LocalClip = {
    id: string;
    title: string;
    thumbnail: string;
    duration: number;
    videoUrl: string;
};
export type AspectRatio = "16:9" | "1:1" | "4:5" | "9:16";
export interface TimelineRow {
    id: number;
    index: number;
}
export interface WaveformData {
    peaks: number[];
    length: number;
}
export interface EditorContextType {
    rows: TimelineRow[];
    addRow: () => void;
}
/**
 * ImageStyles interface defining all the style properties available for image overlays
 *
 * @property filter - CSS filter string applying visual effects (can use presets or custom values)
 * @property borderRadius - Border radius for rounded corners
 * @property objectFit - How the image should be resized/positioned within its container
 * @property objectPosition - Positioning of the image within its container
 * @property boxShadow - CSS box-shadow property for drop shadows
 * @property border - CSS border property for image borders
 * @property animation - Enter/exit animation configuration
 */
export interface ImageStyles extends BaseStyles {
    filter?: string;
    borderRadius?: string;
    objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
    objectPosition?: string;
    boxShadow?: string;
    border?: string;
    padding?: string;
    paddingBackgroundColor?: string;
    animation?: AnimationConfig;
}
export interface ImageOverlay extends BaseOverlay {
    type: OverlayType.IMAGE;
    src: string;
    content?: string;
    styles: ImageStyles;
}
export interface EditClip extends TimelineItem {
    edit_id: number;
    start_time: string;
    end_time: string;
    sort: number;
    createdat: string;
    updatedat: string;
    clip_name: string;
    game_id: number;
    video_url: string;
    home_team_logo?: string;
    away_team_logo?: string;
    time_in_game: number;
    home_team_goal: number;
    away_team_goal: number;
    period: number;
}
export interface RenderUrl {
    id: string;
    url: string;
    timestamp: number;
}
export interface BasketballTeam {
    id: string;
    name: string;
    country: string | null;
    logo: string;
    website: string;
}
export interface SoccerTeam {
    id: string;
    name: string;
    short_name: string;
    image: string;
    team_color: string;
    second_color: string;
    sponsor_logo: string;
    sponsor_url: string;
    create_highlights: boolean;
    show_sponsor: boolean;
    team_language: string;
    filter_by_position: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface Country {
    id: number;
    name: string;
    short_name: string;
    code: string;
}
export interface Team {
    id: number;
    name: string;
    country: Country | null;
    logo: string;
    website: string;
}
export interface Section {
    id: number;
    name: string;
    order_num: number;
}
export interface League {
    id: number;
    section: Section;
    name: string;
    country: string | null;
    division: string | null;
    logo: string;
    website: string;
}
export interface Season {
    id: number;
    name: string;
}
export interface Step {
    id: number;
    name: string;
    play_off: boolean;
    order_num: number;
}
export interface BasketballGame {
    id: string;
    game_date: string;
    season: Season;
    league: League;
    step: Step;
    home_team: Team;
    away_team: Team;
    jornada: number;
}
export interface SoccerGame {
    id: string;
    season_id: string;
    league_id: string;
    date: string;
    home_team_id: string;
    away_team_id: string;
    video_url: string;
    createat: string;
    updateat: string;
    image: string;
    mobile_video_url: string;
    mute_video: boolean;
    season_name: string;
    league_name: string;
    home_team_name: string;
    away_team_name: string;
    home_team_image: string;
    away_team_image: string;
    home_team_goals: number;
    away_team_goals: number;
    yellow_cards: number;
    red_cards: number;
    player_info: string;
    start_of_game: string;
    start_of_half: string;
    start_of_overtime: string | null;
    tagging: boolean;
    home_team_standing_id: number;
    home_team_standing_name: string;
    home_team_standing_image: string;
    away_team_standing_id: string;
    away_team_standing_name: string;
    away_team_standing_image: string;
    home_team_started_players: string;
    home_team_bench_players: string;
    away_team_started_players: string;
    away_team_bench_players: string;
}
export interface DefensiveType {
    id: string;
    name: string;
    short_name: string;
}
export interface courtAreaType {
    id: string;
    name: string;
}
export interface matchPeriodType {
    id: string;
    name: string;
}
export interface PossessionType {
    id: string;
    name: string;
    short_name: string;
}
export interface PossessionStartedOf {
    id: string;
    name: string;
    short_name: string;
}
export interface IndividualAction {
    id: string;
    name: string;
    short_name: string;
}
export interface ActionResult {
    id: string;
    name: string;
    short_name: string;
}
export interface Position {
    id: number;
    name: string;
    short_name: string;
}
export interface Player {
    id: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    height: number;
    main_nationality: Country;
    position: Position;
    profile_photo: string;
    free_profile_access_until: string | null;
    page_views: number;
    jersey_number: number | null;
}
export interface SoccerPlayer {
    player_id: string;
    player_first_name: string;
    player_last_name: string;
    player_date_of_birth: string;
    player_jersey_number: string;
    player_position_id: string;
    player_position_name: string;
    player_position_short_name: string;
    player_image: string;
}
export interface ActionType {
    id: string;
    name: string;
    short_name: string;
}
export interface IndividualSoccerAction {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}
export interface SoccerActionResult {
    id: string;
    name: string;
    end_possession: boolean;
    change_possession: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface ActionType extends IndividualSoccerAction {
}
export interface FilterBasketballClipsParams {
    p_team_id?: number;
    p_type?: number;
    p_game_id: string | null;
    p_offensive_possessions_type_id: string | null;
    p_defensive_possessions_type_id: string | null;
    p_possessions_started_of_id: string | null;
    p_action_id: string | null;
    p_action_types_id: string | null;
    p_action_results_id: string | null;
    p_player_id: string | null;
    p_folder_id?: number;
}
export interface FilterBasketballValues {
    teams: BasketballTeam[];
    p_type: number;
    games: BasketballGame[];
    defensiveTypes: DefensiveType[];
    possessionTypes: PossessionType[];
    possessionsStartedOf: PossessionStartedOf[];
    actions: IndividualAction[];
    actionTypes: ActionType[];
    actionResults: ActionResult[];
    individuals: Player[];
    folderId?: string;
}
export interface LocalMediaFile {
    id: string;
    name: string;
    type: "video" | "image" | "audio";
    path: string;
    size: number;
    lastModified: number;
    thumbnail?: string;
    duration?: number;
}
export interface FilterSoccerValues {
    teams: SoccerTeam[];
    p_type: number;
    games: SoccerGame[];
    courtAreas: courtAreaType[];
    matchPeriods: matchPeriodType[];
    possessionsStartedOf: PossessionStartedOf[];
    actions: IndividualSoccerAction[];
    actionTypes: IndividualSoccerAction[];
    actionResults: SoccerActionResult[];
    individuals: SoccerPlayer[];
    folderId?: string;
}
export {};
//# sourceMappingURL=types.d.ts.map