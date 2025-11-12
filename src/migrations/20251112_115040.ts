import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_about_section_left_text_color" AS ENUM('text-black', 'text-background', 'text-white', 'text-creme', 'text-primary-green');
  CREATE TYPE "public"."enum_pages_blocks_about_section_right_text_color" AS ENUM('text-black', 'text-background', 'text-white', 'text-creme', 'text-primary-green');
  CREATE TYPE "public"."enum__pages_v_blocks_about_section_left_text_color" AS ENUM('text-black', 'text-background', 'text-white', 'text-creme', 'text-primary-green');
  CREATE TYPE "public"."enum__pages_v_blocks_about_section_right_text_color" AS ENUM('text-black', 'text-background', 'text-white', 'text-creme', 'text-primary-green');
  ALTER TABLE "pages_blocks_about_section" ADD COLUMN "left_text_color" "enum_pages_blocks_about_section_left_text_color" DEFAULT 'text-black';
  ALTER TABLE "pages_blocks_about_section" ADD COLUMN "right_text_color" "enum_pages_blocks_about_section_right_text_color" DEFAULT 'text-black';
  ALTER TABLE "_pages_v_blocks_about_section" ADD COLUMN "left_text_color" "enum__pages_v_blocks_about_section_left_text_color" DEFAULT 'text-black';
  ALTER TABLE "_pages_v_blocks_about_section" ADD COLUMN "right_text_color" "enum__pages_v_blocks_about_section_right_text_color" DEFAULT 'text-black';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_about_section" DROP COLUMN "left_text_color";
  ALTER TABLE "pages_blocks_about_section" DROP COLUMN "right_text_color";
  ALTER TABLE "_pages_v_blocks_about_section" DROP COLUMN "left_text_color";
  ALTER TABLE "_pages_v_blocks_about_section" DROP COLUMN "right_text_color";
  DROP TYPE "public"."enum_pages_blocks_about_section_left_text_color";
  DROP TYPE "public"."enum_pages_blocks_about_section_right_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_about_section_left_text_color";
  DROP TYPE "public"."enum__pages_v_blocks_about_section_right_text_color";`)
}
