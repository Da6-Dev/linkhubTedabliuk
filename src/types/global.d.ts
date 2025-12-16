export {};

declare global {
  interface Document {
    // API de Transição de Visualização (View Transitions)
    startViewTransition?: (callback: () => Promise<void> | void) => {
      ready: Promise<void>;
      finished: Promise<void>;
      updateCallbackDone: Promise<void>;
    };
  }

  interface Window {
    // Detectar Opera antigo
    opera?: any;
    
    // Biblioteca SkinView3D carregada via CDN
    skinview3d: {
      SkinViewer: new (options: {
        canvas: HTMLCanvasElement;
        width: number;
        height: number;
        skin: string;
        alpha?: boolean;
      }) => SkinViewerInstance;
      IdleAnimation: new () => any;
      WalkingAnimation: new () => any;
    };
  }
}

// Tipagem básica para a instância do Viewer (usada no Mascot.tsx)
interface SkinViewerInstance {
  camera: {
    position: { x: number; y: number; z: number };
  };
  zoom: number;
  animation: any;
  controls: {
    enableZoom: boolean;
    enableRotate: boolean;
    enablePan: boolean;
  };
  dispose: () => void;
}