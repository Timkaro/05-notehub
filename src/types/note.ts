export type TagType = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface Note {
    id: string;
    title: string;
    content?: string;
    createdAt: string;
    updatedAt: string;
    tag: TagType;   
}

export interface CreateNote {
  title: string;
  content: string;
  tag: TagType;
}
