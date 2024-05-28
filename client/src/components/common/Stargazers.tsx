import { IconStarFilled } from "@tabler/icons-react";
import { useEffect, useState } from "preact/hooks";

interface StargazersProps {
  url: string;
}

export default function Stargazers({ url }: StargazersProps) {
  const [stars, setStars] = useState<number>();

  useEffect(() => {
    const fetchStars = async () => {
      const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (match) {
        const owner = match[1];
        const repo = match[2];

        fetch(`/api/github/${owner}/${repo}`)
          .then(response => response.json())
          .then(data => {
            setStars(data.stargazers_count);
          })
          .catch(err => console.log(err));
      }
    };

    fetchStars();
  }, []);

  return (
    <div class="flex m-2 ml-0 px-2 py-1 rounded-lg items-center bg-zinc-600">
      <IconStarFilled color="gold" size={18} />
      <span class="-translate-y-[1px] pl-1 font-medium">{stars}</span>
    </div>
  );
}
