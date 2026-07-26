import type { ProjectVideo } from "@/types/content";
import styles from "./ProjectDetail.module.css";

function youtubeEmbed(url: string) {
  try {
    const parsed = new URL(url);
    const id = parsed.hostname.includes("youtu.be") ? parsed.pathname.slice(1) : parsed.searchParams.get("v");
    return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export default function ProjectVideos({ items }: { items: ProjectVideo[] }) {
  return (
    <div className={styles.videoGrid}>
      {items.map((item, index) => {
        const youtube = item.type === "youtube" || /youtu\.?be/i.test(item.url) ? youtubeEmbed(item.url) : null;
        return (
          <figure key={`${item.url}-${index}`}>
            <div className={styles.videoFrame}>
              {youtube ? (
                <iframe src={youtube} title={item.title} loading="lazy" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              ) : (
                <video controls preload="metadata" src={item.url} aria-label={item.title}>
                  Your browser does not support embedded video.
                </video>
              )}
            </div>
            <figcaption><strong>{item.title}</strong>{item.captionEn ? <p>{item.captionEn}</p> : null}</figcaption>
          </figure>
        );
      })}
    </div>
  );
}
