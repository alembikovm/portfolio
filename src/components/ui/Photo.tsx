import Image from "next/image";

type Props = {
  src?: string | null;
  alt: string;
  /** Tailwind gradient stops used when there is no image yet. */
  tone?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  grayscale?: boolean;
  /** CSS object-position for the image crop. */
  focus?: string;
  sizes?: string;
};

/** Real image when `src` is set, otherwise a tasteful gradient placeholder. */
export function Photo({ src, alt, tone = "from-stone-300 to-stone-600", className = "", imgClassName = "", priority, grayscale, focus, sizes = "(max-width: 768px) 100vw, 50vw" }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={focus ? { objectPosition: focus } : undefined}
          className={`object-cover ${grayscale ? "grayscale" : ""} ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className={`absolute inset-0 bg-gradient-to-br ${tone} ${grayscale ? "grayscale" : ""} ${imgClassName}`}
        >
          <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:3px_3px]" />
        </div>
      )}
    </div>
  );
}
