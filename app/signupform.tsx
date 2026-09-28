"use client";

export default function SignupForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Compte créé avec succès.");
      }}
      className="max-w-[450px] mx-auto flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Votre nom"
        required
        className="w-full px-4 py-3.5 rounded-md border border-gray-300 text-[#222] text-[15px]"
      />
      <input
        type="email"
        placeholder="Votre adresse e-mail"
        required
        className="w-full px-4 py-3.5 rounded-md border border-gray-300 text-[#222] text-[15px]"
      />
      <input
        type="password"
        placeholder="Votre mot de passe"
        required
        className="w-full px-4 py-3.5 rounded-md border border-gray-300 text-[#222] text-[15px]"
      />
      <button
        type="submit"
        className="bg-[#a27645] text-white text-[15px] px-6 py-3.5 rounded-md hover:bg-[#805a32] transition mt-2"
      >
        Créer mon compte
      </button>
    </form>
  );
}