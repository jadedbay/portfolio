enum Link {
  Demo,
  Site,
  InviteBot,
}

interface LinkProps {
  url: string;
}

function LinkButton({ url }: LinkProps) {
  return (
    <a href={url} class="border rounded">
      TEST
    </a>
  );
}

export { Link, LinkButton };
