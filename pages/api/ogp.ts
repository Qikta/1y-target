// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCanvas, loadImage, registerFont } from 'canvas';
import type { NextApiRequest, NextApiResponse } from 'next'

import { supabase } from '../../utils/supabaseClient'
import path from 'path';
import { removeBucketPath } from '../../utils/supabaseStorage';
import { generateOgpPath } from '../../utils/generateOgpPath';

export interface ICreateOgpResponse {
  ogp_url?: string
  debugMessage: string
}

const createOgp = async (
    req: NextApiRequest,
    res: NextApiResponse<ICreateOgpResponse>
  ): Promise<void> => {
    const { title, user_name } = req.body;
    const WIDTH = 1200 as const;
    const HEIGHT = 630 as const;
    const DX = 0 as const;
    const DY = 0 as const;
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    const backgroundImage = await loadImage(path.resolve("./public/bg_ogp.png"));
    ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);
    registerFont(path.resolve("./fonts/851MkPOP_100.ttf"), {
      family: "851MkPOP",
    });
    ctx.font = "84px 851MkPOP";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // 文字数が多い場合は末尾を`...`で省略
    const text = String(title).length > 50 ? String(title).slice(0, 49) + '...' : String(title)

    ctx.save()
    ctx.rotate((-8 * Math.PI) / 180)
    ctx.translate(-50, 55)

    let line = ''
    const lines = []
    for (let i = 0; i < text.length; i++) {
      line += text[i]
      const lineWidth = ctx.measureText(line).width
      if (lineWidth > WIDTH - 400 || i == text.length - 1) {
        lines.push({ text: line, width: lineWidth })
        line = ''
      }
    }

    const lineWidth = Math.max(...lines.map((line) => line.width))
    const lineHeight = 84 * 1.25
  
    // 1行の時は中央寄せ、2行以上の時は左寄せ
    const x = lines.length > 1 ? (WIDTH - lineWidth) / 2 : WIDTH / 2
    ctx.textAlign = lines.length > 1 ? 'left' : 'center'
  
    lines.forEach((line, index) => {
      const y =
        index * lineHeight + HEIGHT / 2.1 - (lineHeight / 2) * (lines.length - 1)
      ctx.fillText(line.text, x, y)
    })

    ctx.restore()

    // ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
    const buffer = canvas.toBuffer();
    const savePath = generateOgpPath();
    const { data: inputData, error } = await supabase.storage
        .from('ogp-img')
        .upload(`opg/${savePath}.png`, buffer, {
      contentType: 'image/png',
      cacheControl: '3600',
      upsert: false
    })
    if (error) { throw error }
    
    const key = inputData?.Key
    if (!key) { throw new Error('storage key is undefined')}

    const { data, error: err } = await supabase.storage.from('ogp-img').getPublicUrl(removeBucketPath(key, "ogp-img"))
    if (err) { throw err }

    if (data) {
      const body: ICreateOgpResponse = {
        ogp_url: data.publicURL,
        debugMessage: 'get ogp url'
      }
      res.status(200).json(body)
    } else {
      res.status(400).json({ debugMessage: `ogp url not found`})
    }
  }
  
  export default createOgp;
