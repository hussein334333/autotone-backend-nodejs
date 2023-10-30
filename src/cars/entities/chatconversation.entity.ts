
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './users.entity';
import { ChatMessage } from './chatmessage.entity';

@Entity('chat-conversations')
export class ChatConversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_1: string;

  @Column()
  user_2: string;

  @ManyToOne(type => User, user => user.id)
  user1: User;

  @ManyToOne(type => User, user => user.id)
  user2: User;

  @OneToMany(type => ChatMessage, message => message.conversation)
  messages: ChatMessage[];

  getSecondUser(user_id: string): User {
    return this.user_1 == user_id ? this.user2 : this.user1;
  }

  getLatestMessage(): ChatMessage | null {
    return this.messages.length > 0 ? this.messages[this.messages.length - 1] : null;
  }
}
