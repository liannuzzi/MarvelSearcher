import HeroesGridContainer from "@/components/HeroesGridContainer/HeroesGridContainer";

export const metadata = {
  title: "Marvel App",
  description: "Generated by Lucas Iannuzzi",
};

function IndexPage() {
  return (
    <div>
      <HeroesGridContainer />
    </div>
  );
}

export default IndexPage;
