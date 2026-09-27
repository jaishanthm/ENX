# ENX - Mitsuha SnowAngel CTF Portfolio

A pure static cybersecurity portfolio challenge designed for CTF competitions.

## 🎯 Challenge Overview

- **Target Persona:** `mitsuhasnowangel1`
- **Objective:** Inspect candidate's portfolio, download the official PDF resume, locate the clearance verification key, and decode the flag.
- **Encoding:** Base64 (`RU5Ye1JlNXVNM30=` → `ENX{Re5uM3}`)
- **Flag Format:** `ENX{...}`

## 📁 Repository Structure

```
.
├── index.html        # Main static portfolio website
├── resume.pdf        # Verified PDF resume with Base64 encoded token
├── resume.html       # Printable HTML source template for resume
├── vercel.json       # Vercel static deployment configuration
├── robots.txt        # Web crawler directives
├── sitemap.xml       # Site map index
├── css/
│   └── style.css     # Cyber-frost styling & glassmorphism
├── js/
│   └── main.js       # Dynamic snow canvas, terminal, & preview modal
└── assets/
    ├── avatar.svg    # Vector cyber-angel avatar
    └── resume-preview.png # High-res preview thumbnail
```

## 🚀 Deploying on Vercel

1. Import this repository into [Vercel](https://vercel.com).
2. Framework Preset: **Other** (Pure Static).
3. Root Directory: `./`
4. Deploy!
