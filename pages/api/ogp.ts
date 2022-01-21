// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCanvas, loadImage, registerFont } from 'canvas';
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'
import path from 'path';


const createOgp = async (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<void> => {
    const { id } = req.query;
    const WIDTH = 1200 as const;
    const HEIGHT = 630 as const;
    const DX = 0 as const;
    const DY = 0 as const;
    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");

    const backgroundImage = await loadImage(path.resolve("./public/background_ogp.png"));
    ctx.drawImage(backgroundImage, DX, DY, WIDTH, HEIGHT);
    // registerFont(path.resolve("./fonts/NotoSansJP-Regular.otf"), {
    //   family: "Noto",
    // });
    // ctx.fillStyle = "#FFF";
    // ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.font = "60px ipagp";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const text = "ogp生成したいねん"
    ctx.fillText(text, WIDTH / 2, HEIGHT / 2);
    const buffer = canvas.toBuffer();
    const { error } = await supabase.storage
        .from('ogp-img')
        .upload('opg/test8.png', buffer, {
      contentType: 'image/png',
      cacheControl: '3600',
      upsert: false
    })
    if (error) { throw error }
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": buffer.length,
    });
    res.end(buffer, "binary");
  }
  
  export default createOgp;
