"use client";

import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

type Weather = { temp: number; label: string; Icon: LucideIcon };

function describe(code: number, isDay: boolean): { label: string; Icon: LucideIcon } {
  if (code === 0) return { label: "Clear", Icon: isDay ? Sun : Moon };
  if (code <= 2) return { label: "Partly cloudy", Icon: CloudSun };
  if (code === 3) return { label: "Overcast", Icon: Cloud };
  if (code === 45 || code === 48) return { label: "Fog", Icon: CloudFog };
  if (code >= 51 && code <= 57) return { label: "Drizzle", Icon: CloudDrizzle };
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return { label: "Rain", Icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: "Snow", Icon: CloudSnow };
  if (code >= 95) return { label: "Thunderstorm", Icon: CloudLightning };
  return { label: "Cloudy", Icon: Cloud };
}

const pad = (n: number) => String(n).padStart(2, "0");

function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return now;
}

function useChennaiWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  useEffect(() => {
    let cancelled = false;
    const show = (code: number, temp: number, isDay: boolean) => {
      if (!cancelled) setWeather({ temp, ...describe(code, isDay) });
    };
    try {
      const cached = sessionStorage.getItem("chennai-weather");
      if (cached) {
        const c = JSON.parse(cached);
        if (Date.now() - c.at < 15 * 60_000) {
          show(c.code, c.temp, c.isDay);
          return () => {
            cancelled = true;
          };
        }
      }
    } catch {}

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=13.0827&longitude=80.2707&current=temperature_2m,weather_code,is_day",
    )
      .then((r) => r.json())
      .then((d) => {
        const c = d.current;
        const temp = Math.round(c.temperature_2m);
        const isDay = c.is_day === 1;
        try {
          sessionStorage.setItem("chennai-weather", JSON.stringify({ at: Date.now(), code: c.weather_code, temp, isDay }));
        } catch {}
        show(c.weather_code, temp, isDay);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return weather;
}

export function StatusStrip() {
  const now = useNow();
  const weather = useChennaiWeather();

  const time =
    now &&
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);

  let uptime: string | null = null;
  if (now) {
    const s = Math.max(0, Math.floor((now - new Date(site.launch).getTime()) / 1000));
    uptime = `${Math.floor(s / 86400)}d ${pad(Math.floor((s % 86400) / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
      <span className="flex items-center gap-2">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full rounded-full bg-emerald-400 [animation:pulse-ring_2s_ease-out_infinite]" />
          <span className="relative size-2 rounded-full bg-emerald-400" />
        </span>
        CHENNAI <span className="inline-block min-w-[8ch] text-fg tabular-nums">{time ?? "--:--:--"}</span> IST
      </span>
      <span>
        UPTIME <span className="inline-block min-w-[11ch] text-fg tabular-nums">{uptime ?? "-d --:--:--"}</span>
      </span>
      <span className="flex items-center gap-1.5">
        {weather ? <weather.Icon className="size-3.5 text-accent" /> : <Cloud className="size-3.5 opacity-40" />}
        <span className="text-fg">{weather ? `${weather.temp}°C` : "--°C"}</span>
        {weather?.label ?? "Loading weather"}
      </span>
    </div>
  );
}
