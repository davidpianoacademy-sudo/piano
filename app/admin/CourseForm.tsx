"use client";

import { useActionState } from "react";
import { createCourse, type ActionState } from "./actions";

const initialState: ActionState = { success: false };

export default function CourseForm() {
  const [state, formAction, pending] = useActionState(
    createCourse,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-semibold">Créer un nouveau cours</h2>

      {state?.error && (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      {state?.success && (
        <p className="rounded border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          {state.success}
        </p>
      )}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Titre du cours *
        </label>
        <input
          id="title"
          name="title"
          required
          className="w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Les bases du solfège"
        />
      </div>

      <div>
        <label htmlFor="youtube_url" className="mb-1 block text-sm font-medium">
          Lien YouTube *
        </label>
        <input
          id="youtube_url"
          name="youtube_url"
          type="url"
          required
          className="w-full rounded border border-gray-300 px-3 py-2"
          placeholder="https://youtu.be/dQw4w9WgXcQ"
        />
        <p className="mt-1 text-xs text-gray-500">
          Formats acceptés : youtu.be/ID · youtube.com/watch?v=ID · /embed/ID ·
          /shorts/ID
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium">
            Catégorie *
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue="debutant"
            className="w-full rounded border border-gray-300 px-3 py-2"
          >
            <option value="debutant">Débutant</option>
            <option value="intermediaire">Intermédiaire</option>
            <option value="avance">Avancé</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="duration_min"
            className="mb-1 block text-sm font-medium"
          >
            Durée (minutes)
          </label>
          <input
            id="duration_min"
            name="duration_min"
            type="number"
            min="1"
            className="w-full rounded border border-gray-300 px-3 py-2"
            placeholder="12"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Ce que l'élève va apprendre dans ce cours..."
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="is_published"
          defaultChecked
          className="h-4 w-4"
        />
        Publier immédiatement (visible dans l’espace étudiant)
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Création..." : "Créer le cours"}
      </button>
    </form>
  );
}