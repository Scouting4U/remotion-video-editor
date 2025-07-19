export type AnimationTemplate = {
    name: string;
    preview: string;
    isPro?: boolean;
    enter: (frame: number, durationInFrames: number) => {
        transform?: string;
        opacity?: number;
    };
    exit: (frame: number, durationInFrames: number) => {
        transform?: string;
        opacity?: number;
    };
};
export declare const animationTemplates: Record<string, AnimationTemplate>;
//# sourceMappingURL=animation-templates.d.ts.map