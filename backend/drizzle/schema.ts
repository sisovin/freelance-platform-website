import { 
  pgTable, 
  serial, 
  varchar, 
  text, 
  integer, 
  timestamp,
  uuid,
  primaryKey 
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  profilePicture: varchar('profile_picture', { length: 255 }),
  bio: text('bio'),
});

// Jobs table
export const jobs = pgTable('jobs', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  salary: integer('salary').notNull(),
  deadline: timestamp('deadline').notNull(),
  createdById: integer('created_by_id').notNull().references(() => users.id),
});

// Posts table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  createdById: integer('created_by_id').notNull().references(() => users.id),
});

// Media table
export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 255 }).notNull(),
  uploadedById: integer('uploaded_by_id').notNull().references(() => users.id),
});

// Comments table
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  postId: integer('post_id').notNull().references(() => posts.id),
  userId: integer('user_id').notNull().references(() => users.id),
});

// Many-to-many relations tables
export const usersFriends = pgTable('users_friends', {
  userId: integer('user_id').notNull().references(() => users.id),
  friendId: integer('friend_id').notNull().references(() => users.id),
}, (t) => ({
  pk: primaryKey(t.userId, t.friendId),
}));

export const usersGroups = pgTable('users_groups', {
  userId: integer('user_id').notNull().references(() => users.id),
  groupId: integer('group_id').notNull(), // Add groups table if needed
}, (t) => ({
  pk: primaryKey(t.userId, t.groupId),
}));

export const postLikes = pgTable('post_likes', {
  postId: integer('post_id').notNull().references(() => posts.id),
  userId: integer('user_id').notNull().references(() => users.id),
}, (t) => ({
  pk: primaryKey(t.postId, t.userId),
}));

// Relations setup
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  uploadedMedia: many(media),
  friends: many(usersFriends, { relationName: 'userFriends' }),
  groups: many(usersGroups),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.createdById],
    references: [users.id],
  }),
  comments: many(comments),
  likes: many(postLikes),
}));
