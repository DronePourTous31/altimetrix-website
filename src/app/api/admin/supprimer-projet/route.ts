import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";

const PIPELINE_DIR = "F:\\DRONE\\ALTIMETRIX\\SCRIPT\\pipeline";
const PYTHON = "C:\\Users\\valer\\AppData\\Local\\hermes\\hermes-agent\\venv\\Scripts\\python.exe";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { projet_id } = await req.json();

  if (!projet_id) {
    return NextResponse.json({ error: "projet_id requis" }, { status: 400 });
  }

  // Récupérer le projet avec les infos client
  const { data: projet, error: projErr } = await supabase
    .from("projets")
    .select("id, nom, user_id, profiles(prenom, nom)")
    .eq("id", projet_id)
    .single();

  if (projErr || !projet) {
    return NextResponse.json({ error: "Projet introuvable" }, { status: 404 });
  }

  const profile = (Array.isArray(projet.profiles) ? projet.profiles[0] : projet.profiles) as { prenom: string; nom: string } | null;
  if (!profile) {
    return NextResponse.json({ error: "Profil client introuvable" }, { status: 404 });
  }

  const clientName = `${profile.prenom.toUpperCase()}_${profile.nom.toUpperCase()}/${projet.nom}`;

  try {
    // Lancer le script Python de nettoyage complet
    const scriptPath = path.join(PIPELINE_DIR, "step13_delete_project.py");
    const cmd = `"${PYTHON}" "${scriptPath}" --client "${clientName}" --projet-id "${projet_id}"`;

    const stdout = execSync(cmd, {
      cwd: PIPELINE_DIR,
      timeout: 120000,
      encoding: "utf-8",
      maxBuffer: 10 * 1024 * 1024,
    });

    return NextResponse.json({ success: true, message: "Projet supprimé", output: stdout });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: `Échec suppression : ${msg}` }, { status: 500 });
  }
}
