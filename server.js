const http=require("http"),fs=require("fs"),path=require("path");
const KEY=process.env.ANTHROPIC_API_KEY,PORT=process.env.PORT||3000,SMALL=process.env.MODEL_SMALL||"claude-haiku-5-5",BIG=process.env.MODEL_BIG||"claude-sonnet-5-5"; // Haiku for chat and quick results, Sonnet for full product creation
const PUB=path.join(__dirname,"public"),hits=new Map();
function limited(ip){const n=Date.now(),a=(hits.get(ip)||[]).filter(t=>n-t<3600e3);a.push(n);hits.set(ip,a);return a.length>30} // 30 AI requests per visitor per hour
http.createServer(async(req,res)=>{
 if(req.method==="POST"&&req.url==="/api/ai"){
  if(!KEY){res.writeHead(500);return res.end("{}")}
  if(limited(req.headers["x-forwarded-for"]||req.socket.remoteAddress)){res.writeHead(429);return res.end("{}")}
  let b="";for await(const c of req){b+=c;if(b.length>60000){res.writeHead(413);return res.end("{}")}}
  try{
   const {prompt,big}=JSON.parse(b);
   const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"x-api-key":KEY,"anthropic-version":"2023-06-01","content-type":"application/json"},body:JSON.stringify({model:big?BIG:SMALL,max_tokens:4000,messages:[{role:"user",content:String(prompt)}]})});
   const j=await r.json();const text=(j.content||[]).map(x=>x.text||"").join("");
   res.writeHead(200,{"content-type":"application/json"});return res.end(JSON.stringify({text}));
  }catch(e){res.writeHead(500);return res.end("{}")}
 }
 let p=decodeURIComponent(req.url.split("?")[0]);if(p==="/")p="/index.html";
 const f=path.join(PUB,path.normalize(p));
 if(!f.startsWith(PUB)){res.writeHead(403);return res.end()}
 fs.readFile(f,(e,d)=>{if(e){res.writeHead(404);return res.end("Not found")}
  const t={".html":"text/html",".js":"text/javascript",".css":"text/css",".png":"image/png",".svg":"image/svg+xml"}[path.extname(f)]||"application/octet-stream";
  res.writeHead(200,{"content-type":t});res.end(d)});
}).listen(PORT,()=>console.log("NEXORA running on port "+PORT));
