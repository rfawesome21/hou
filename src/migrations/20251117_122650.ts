import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_with_content_margin_top" AS ENUM('mt-0', 'mt-[77px]');
  CREATE TYPE "public"."enum_pages_blocks_image_with_content_image_height" AS ENUM('h-[1081px]', 'h-[951px]');
  CREATE TYPE "public"."enum_pages_blocks_explore_section_background_color" AS ENUM('bg-creme', 'bg-background', 'bg-white', 'bg-black', 'bg-primary-green');
  CREATE TYPE "public"."enum_pages_blocks_image_with_form_margin_top" AS ENUM('mt-0', 'mt-[96px]', 'mt-[150px]');
  CREATE TYPE "public"."enum_pages_blocks_image_with_form_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_image_with_content_margin_top" AS ENUM('mt-0', 'mt-[77px]');
  CREATE TYPE "public"."enum__pages_v_blocks_image_with_content_image_height" AS ENUM('h-[1081px]', 'h-[951px]');
  CREATE TYPE "public"."enum__pages_v_blocks_explore_section_background_color" AS ENUM('bg-creme', 'bg-background', 'bg-white', 'bg-black', 'bg-primary-green');
  CREATE TYPE "public"."enum__pages_v_blocks_image_with_form_margin_top" AS ENUM('mt-0', 'mt-[96px]', 'mt-[150px]');
  CREATE TYPE "public"."enum__pages_v_blocks_image_with_form_image_position" AS ENUM('left', 'right');
  CREATE TABLE "pages_blocks_explore_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"category_id" integer,
  	"columns" numeric DEFAULT 3,
  	"background_color" "enum_pages_blocks_explore_section_background_color" DEFAULT 'bg-background',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_with_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"margin_top" "enum_pages_blocks_image_with_form_margin_top" DEFAULT 'mt-[96px]',
  	"image_position" "enum_pages_blocks_image_with_form_image_position" DEFAULT 'left',
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"form_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_explore_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"category_id" integer,
  	"columns" numeric DEFAULT 3,
  	"background_color" "enum__pages_v_blocks_explore_section_background_color" DEFAULT 'bg-background',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_with_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"margin_top" "enum__pages_v_blocks_image_with_form_margin_top" DEFAULT 'mt-[96px]',
  	"image_position" "enum__pages_v_blocks_image_with_form_image_position" DEFAULT 'left',
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"form_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_other_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "posts_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "_posts_v_version_other_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "sizes" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "pages_blocks_image_with_content" ADD COLUMN "margin_top" "enum_pages_blocks_image_with_content_margin_top" DEFAULT 'mt-0';
  ALTER TABLE "pages_blocks_image_with_content" ADD COLUMN "show_get_in_touch" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_image_with_content" ADD COLUMN "image_height" "enum_pages_blocks_image_with_content_image_height" DEFAULT 'h-[1081px]';
  ALTER TABLE "_pages_v_blocks_image_with_content" ADD COLUMN "margin_top" "enum__pages_v_blocks_image_with_content_margin_top" DEFAULT 'mt-0';
  ALTER TABLE "_pages_v_blocks_image_with_content" ADD COLUMN "show_get_in_touch" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_image_with_content" ADD COLUMN "image_height" "enum__pages_v_blocks_image_with_content_image_height" DEFAULT 'h-[1081px]';
  ALTER TABLE "posts_rels" ADD COLUMN "sizes_id" varchar;
  ALTER TABLE "_posts_v_rels" ADD COLUMN "sizes_id" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "sizes_id" varchar;
  ALTER TABLE "pages_blocks_explore_section" ADD CONSTRAINT "pages_blocks_explore_section_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_explore_section" ADD CONSTRAINT "pages_blocks_explore_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_form" ADD CONSTRAINT "pages_blocks_image_with_form_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_form" ADD CONSTRAINT "pages_blocks_image_with_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_with_form" ADD CONSTRAINT "pages_blocks_image_with_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_explore_section" ADD CONSTRAINT "_pages_v_blocks_explore_section_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_explore_section" ADD CONSTRAINT "_pages_v_blocks_explore_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_with_form" ADD CONSTRAINT "_pages_v_blocks_image_with_form_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_with_form" ADD CONSTRAINT "_pages_v_blocks_image_with_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_with_form" ADD CONSTRAINT "_pages_v_blocks_image_with_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_other_images" ADD CONSTRAINT "posts_other_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_other_images" ADD CONSTRAINT "posts_other_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_breadcrumbs" ADD CONSTRAINT "posts_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_other_images" ADD CONSTRAINT "_posts_v_version_other_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_version_other_images" ADD CONSTRAINT "_posts_v_version_other_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_breadcrumbs" ADD CONSTRAINT "_posts_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_explore_section_order_idx" ON "pages_blocks_explore_section" USING btree ("_order");
  CREATE INDEX "pages_blocks_explore_section_parent_id_idx" ON "pages_blocks_explore_section" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_explore_section_path_idx" ON "pages_blocks_explore_section" USING btree ("_path");
  CREATE INDEX "pages_blocks_explore_section_category_idx" ON "pages_blocks_explore_section" USING btree ("category_id");
  CREATE INDEX "pages_blocks_image_with_form_order_idx" ON "pages_blocks_image_with_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_with_form_parent_id_idx" ON "pages_blocks_image_with_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_with_form_path_idx" ON "pages_blocks_image_with_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_with_form_image_idx" ON "pages_blocks_image_with_form" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_with_form_form_idx" ON "pages_blocks_image_with_form" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_explore_section_order_idx" ON "_pages_v_blocks_explore_section" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_explore_section_parent_id_idx" ON "_pages_v_blocks_explore_section" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_explore_section_path_idx" ON "_pages_v_blocks_explore_section" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_explore_section_category_idx" ON "_pages_v_blocks_explore_section" USING btree ("category_id");
  CREATE INDEX "_pages_v_blocks_image_with_form_order_idx" ON "_pages_v_blocks_image_with_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_with_form_parent_id_idx" ON "_pages_v_blocks_image_with_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_with_form_path_idx" ON "_pages_v_blocks_image_with_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_with_form_image_idx" ON "_pages_v_blocks_image_with_form" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_with_form_form_idx" ON "_pages_v_blocks_image_with_form" USING btree ("form_id");
  CREATE INDEX "posts_other_images_order_idx" ON "posts_other_images" USING btree ("_order");
  CREATE INDEX "posts_other_images_parent_id_idx" ON "posts_other_images" USING btree ("_parent_id");
  CREATE INDEX "posts_other_images_image_idx" ON "posts_other_images" USING btree ("image_id");
  CREATE INDEX "posts_breadcrumbs_order_idx" ON "posts_breadcrumbs" USING btree ("_order");
  CREATE INDEX "posts_breadcrumbs_parent_id_idx" ON "posts_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_other_images_order_idx" ON "_posts_v_version_other_images" USING btree ("_order");
  CREATE INDEX "_posts_v_version_other_images_parent_id_idx" ON "_posts_v_version_other_images" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_version_other_images_image_idx" ON "_posts_v_version_other_images" USING btree ("image_id");
  CREATE INDEX "_posts_v_version_breadcrumbs_order_idx" ON "_posts_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_posts_v_version_breadcrumbs_parent_id_idx" ON "_posts_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "sizes_updated_at_idx" ON "sizes" USING btree ("updated_at");
  CREATE INDEX "sizes_created_at_idx" ON "sizes" USING btree ("created_at");
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_sizes_fk" FOREIGN KEY ("sizes_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_sizes_fk" FOREIGN KEY ("sizes_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sizes_fk" FOREIGN KEY ("sizes_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_rels_sizes_id_idx" ON "posts_rels" USING btree ("sizes_id");
  CREATE INDEX "_posts_v_rels_sizes_id_idx" ON "_posts_v_rels" USING btree ("sizes_id");
  CREATE INDEX "payload_locked_documents_rels_sizes_id_idx" ON "payload_locked_documents_rels" USING btree ("sizes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_explore_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_image_with_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_explore_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_with_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_other_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_other_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sizes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_explore_section" CASCADE;
  DROP TABLE "pages_blocks_image_with_form" CASCADE;
  DROP TABLE "_pages_v_blocks_explore_section" CASCADE;
  DROP TABLE "_pages_v_blocks_image_with_form" CASCADE;
  DROP TABLE "posts_other_images" CASCADE;
  DROP TABLE "posts_breadcrumbs" CASCADE;
  DROP TABLE "_posts_v_version_other_images" CASCADE;
  DROP TABLE "_posts_v_version_breadcrumbs" CASCADE;
  DROP TABLE "sizes" CASCADE;
  ALTER TABLE "posts_rels" DROP CONSTRAINT "posts_rels_sizes_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_sizes_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_sizes_fk";
  
  DROP INDEX "posts_rels_sizes_id_idx";
  DROP INDEX "_posts_v_rels_sizes_id_idx";
  DROP INDEX "payload_locked_documents_rels_sizes_id_idx";
  ALTER TABLE "pages_blocks_image_with_content" DROP COLUMN "margin_top";
  ALTER TABLE "pages_blocks_image_with_content" DROP COLUMN "show_get_in_touch";
  ALTER TABLE "pages_blocks_image_with_content" DROP COLUMN "image_height";
  ALTER TABLE "_pages_v_blocks_image_with_content" DROP COLUMN "margin_top";
  ALTER TABLE "_pages_v_blocks_image_with_content" DROP COLUMN "show_get_in_touch";
  ALTER TABLE "_pages_v_blocks_image_with_content" DROP COLUMN "image_height";
  ALTER TABLE "posts_rels" DROP COLUMN "sizes_id";
  ALTER TABLE "_posts_v_rels" DROP COLUMN "sizes_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "sizes_id";
  DROP TYPE "public"."enum_pages_blocks_image_with_content_margin_top";
  DROP TYPE "public"."enum_pages_blocks_image_with_content_image_height";
  DROP TYPE "public"."enum_pages_blocks_explore_section_background_color";
  DROP TYPE "public"."enum_pages_blocks_image_with_form_margin_top";
  DROP TYPE "public"."enum_pages_blocks_image_with_form_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_image_with_content_margin_top";
  DROP TYPE "public"."enum__pages_v_blocks_image_with_content_image_height";
  DROP TYPE "public"."enum__pages_v_blocks_explore_section_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_image_with_form_margin_top";
  DROP TYPE "public"."enum__pages_v_blocks_image_with_form_image_position";`)
}
