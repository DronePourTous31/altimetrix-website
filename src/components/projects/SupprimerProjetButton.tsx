"use client";

import { useState } from "react";

interface Props {
  projetId: string;
  projetNom: string;
  onDeleted?: () => void;
}

export default function SupprimerProjetButton({ projetId, projetNom, onDeleted }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [msg, setMsg] = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setMsg("");
    try {
      const res = await fetch("/api/projets/supprimer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projet_id: projetId }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Projet supprimé");
        onDeleted?.();
      } else {
        setMsg(data.error || "Erreur");
      }
    } catch {
      setMsg("Erreur réseau");
    }
    setDeleting(false);
    setConfirming(false);
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-red-600 font-medium">Supprimer {projetNom} ?</span>
        <button onClick={handleDelete} disabled={deleting} className="px-2 py-1 bg-red-700 text-white rounded text-xs">
          {deleting ? "..." : "Oui"}
        </button>
        <button onClick={() => setConfirming(false)} className="px-2 py-1 bg-dark-200 text-dark-600 rounded text-xs">
          Non
        </button>
        {msg && <span className="text-xs text-green-600">{msg}</span>}
      </div>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="text-red-600 hover:underline text-xs">
      Supprimer
    </button>
  );
}
