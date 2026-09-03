"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type Candidate = {
  name: string;
  rank: number;
  qualified: boolean;
  tt_point: string;
  tsc_point: string;
  wwc_point: string;
  plus_point: string;
  minus_point: string;
  total_point: string;
};

const points = [
  ["TT Point", "tt_point"],
  ["TSC Point", "tsc_point"],
  ["WWC Point", "wwc_point"],
  ["Plus Point", "plus_point"],
  ["Minus Point", "minus_point"],
] as const;

export default function Home() {
  const [code, setCode] = useState("");
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkCandidate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!code.trim()) {
      setMessage("Masukkan kode kandidat terlebih dahulu.");
      setCandidate(null);
      return;
    }

    setLoading(true);
    setMessage("");
    setCandidate(null);
    try {
      const response = await fetch(`/api/candidate?code=${encodeURIComponent(code)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Terjadi kesalahan.");
      setCandidate(data);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="brand-mark"><Image src="/logo.png" alt="Logo organisasi" width={278} height={55} priority /></div>
        <p className="eyebrow">PENGUMUMAN HASIL SELEKSI</p>
        <h1>Apakah kamu siap<br /><span>bersinar?</span></h1>
        <p className="intro">Masukkan kode kandidatmu untuk melihat hasil dan perjalanan poinmu.</p>

        <form className="search-form" onSubmit={checkCandidate}>
          <label htmlFor="candidate-code">Kode kandidat</label>
          <div className="input-row">
            <input id="candidate-code" name="code" type="text" inputMode="numeric" autoComplete="off" required value={code} onChange={(event) => setCode(event.target.value)} placeholder="Contoh: 5449" aria-describedby="form-message" />
            <button type="submit" disabled={loading}>{loading ? "Mencari..." : "Cek hasil"}<span aria-hidden="true"> →</span></button>
          </div>
          <p id="form-message" className={message ? "form-message" : "sr-only"} role="alert">{message}</p>
        </form>
      </section>

      {candidate && (
        <section className={`result-card ${candidate.qualified ? "qualified" : "not-qualified"}`} aria-live="polite">
          <div className="result-icon" aria-hidden="true">{candidate.qualified ? "✦" : "○"}</div>
          <p className="result-label">{candidate.qualified ? "Selamat! Kamu terpilih" : "Terima kasih sudah berjuang"}</p>
          <h2>{candidate.name}</h2>
          <p className="result-copy">{candidate.qualified ? "Kerja kerasmu membuahkan hasil. Saatnya melangkah lebih jauh." : "Untuk saat ini, kamu belum terpilih. Tetap semangat dan terus berkembang!"}</p>
          {candidate.rank <= 10 && <div className="rank-pill">TOP 10 <strong>#{candidate.rank}</strong></div>}
          <div className="score-grid">
            {points.map(([label, key]) => <div className="score-item" key={key}><span>{label}</span><strong>{candidate[key] || "-"}</strong></div>)}
          </div>
          <div className="total-row"><span>Total poin</span><strong>{candidate.total_point || "-"}</strong></div>
        </section>
      )}
      <p className="footer-note">Hasil berdasarkan data seleksi resmi organisasi.</p>
    </main>
  );
}
