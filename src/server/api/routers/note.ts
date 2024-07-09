import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { Note } from "@prisma/client";

export const noteRouter = createTRPCRouter({
  getNotesForWeek: publicProcedure
    .input(
      z.object({
        startOfWeek: z.string(),
        authorId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const startOfWeek = new Date(input.startOfWeek);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      const notes: Note[] = await ctx.db.note.findMany({
        where: {
          authorId: input.authorId,
          date: {
            gte: startOfWeek.toISOString(),
            lte: endOfWeek.toISOString(),
          },
        },
      });

      return notes;
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        authorId: z.string(),
        date: z.date(),
        startTime: z.number(),
        endTime: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.note.create({
        data: {
          title: input.title,
          description: input.description,
          authorId: input.authorId,
          date: input.date,
          startTime: input.startTime,
          endTime: input.endTime,
        },
      });
    }),

  getNoteForDateTime: publicProcedure
    .input(
      z.object({
        noteId: z.number(), 
      }),
    )
    .query(async ({ ctx, input }) => {
      const note: Note | null = await ctx.db.note.findUnique({
        where: {
          id: input.noteId
        },
      });

      return note;
    }),
    delete: publicProcedure
    .input(
      z.object({
        noteId: z.number(), 
      }),
    ).mutation(async ({ ctx, input }) => {
      return await ctx.db.note.delete({
        where: {
          id: input.noteId
        }
      })
    }),
});
