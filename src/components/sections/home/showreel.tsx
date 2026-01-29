export default function Showreel() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Video Container */}
      <div className="absolute inset-0 h-full w-full">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          // Placeholder: Soyut bir mürekkep akışı videosu (Pexels)
          src="https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4"
        />

        {/* Opsiyonel: Video üzerine hafif bir karartma (Overlay) atabiliriz,
            böylece video çok parlaksa bile sayfa akışını bozmaz.
            Şu anlık opacity-10 ile çok hafif bir ton verdim. */}
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </section>
  );
}
