export default function SectionHead({eyebrow,title,copy}){return <div className="section-head"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>}
