import { IconDownload } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";

interface CrateDownloadsProps {
  url: string;
}

export default function CrateDownloads({ url }: CrateDownloadsProps) {
  const [downloads, setDownloads] = useState<number>();

  useEffect(() => {
    const fetchStars = async () => {
      const match = url.match(/github\.com\/[^\/]+\/([^\/]+)/);
      if (match) {
        const crate = match[1];

        fetch(`/api/crates/${crate}`)
          .then(response => response.json())
          .then(data => {
            setDownloads(data.crate.downloads);
          })
          .catch(err => console.log(err));
      }
    };

    fetchStars();
  }, []);

  return (
    <div class="flex m-2 ml-0 px-2 py-1 rounded-lg items-center bg-zinc-600">
      <IconDownload color="lime" size={18} />
      <span class="-translate-y-[1px] pl-1 font-medium">{downloads}</span>
    </div>
  );
}
