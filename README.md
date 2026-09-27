# ENX - Mitsuha SnowAngel CTF Portfolio

A pure static cybersecurity portfolio challenge designed for CTF competitions.

## 🎯 Challenge Overview

- **Target Persona:** `mitsuhasnowangel1`
- **Objective:** Locate the candidate's archived resume and extract the challenge flag.
- **Hint:** Clicking any resume button on the website provides the hint: *"use advanced google search to find my resume"*.
- **Flag Format:** `ENX{...}`

## 📁 Repository Structure

```
.
├── index.html        # Main static portfolio website
├── resume.pdf        # Verified PDF resume with flag ENX{Re5uM3}
├── resume.html       # Printable HTML source template for resume
├── vercel.json       # Vercel static deployment configuration
├── css/
│   └── style.css     # Cyber-frost styling & glassmorphism
├── js/
│   └── main.js       # Dynamic snow canvas, terminal, & hint modal
└── assets/
    ├── avatar.svg    # Vector cyber-angel avatar
    └── resume-preview.png # High-res preview thumbnail
```

## 🚀 Deploying on Vercel

1. Import this repository into [Vercel](https://vercel.com).
2. Framework Preset: **Other** (Pure Static).
3. Root Directory: `./`
4. Deploy!
