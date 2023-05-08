USE tech_blog_db;

INSERT INTO users (username, email, password, created_at, updated_at)
VALUES ('JohnDoe', 'john.doe@example.com', 'password123', NOW(), NOW());

INSERT INTO posts (title, content, user_id, created_at, updated_at)
VALUES ('Sample Post Title', 'This is a sample post content.', 1, NOW(), NOW());

INSERT INTO comments (content, user_id, post_id, created_at, updated_at)
VALUES ('Great post!', 1, 1, NOW(), NOW());
