CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`is_completed` integer DEFAULT false NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer,
	`deleted_at` integer
);
