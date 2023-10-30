
//Convert the code from PHP to NestJS

import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {ChatConversation} from "./chatconversation.entity"

@Entity('chat_message')
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;


  @ManyToOne(() => ChatConversation, conversation => conversation.messages)
  conversation: ChatConversation
}
