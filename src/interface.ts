import stylus from 'stylus';

type Renderer = ReturnType<typeof stylus>;

type RenderOptions = Renderer['options'];

export interface Options extends RenderOptions {}
