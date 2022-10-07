export interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
}

export const prioriteit: RenderTree = {
  id: "Alles",
  name: "Alle Prioriteiten",
  children: [
    {
      id: "P1",
      name: "P1",
    },
    {
      id: "P2",
      name: "P2",
    },
    {
      id: "P3",
      name: "P3",
    },
    {
      id: "P4",
      name: "P4",
    },
    {
      id: "P5",
      name: "P5",
    }
  ]
}

export const status: RenderTree = {
  id: "Alles",
  name: "Alle Statussen",
  children: [
    {
      id: "Open",
      name: "Open",
    },
    {
      id: "Werkman aangesteld",
      name: "Werkman aangesteld",
    },
    {
      id: "Bezig",
      name: "Bezig",
    },
    {
      id: "Wachten op materiaal",
      name: "Wachten op materiaal",
    },
    {
      id: "Wachten op goedkeuring",
      name: "Wachten op goedkeuring",
    },
    {
      id: "Gesloten",
      name: "Gesloten",
    },
    {
      id: "Verwijderd",
      name: "Verwijderd"
    }
  ],
};

export const locatie: RenderTree = {
  id: "Alles",
  name: "Alle Locaties",
  children: [
    {
      id: "Veldkant 33A, Kontich",
      name: "Veldkant 33A, Kontich",
    },
    {
      id: "Veldkant 33B, Kontich",
      name: "Veldkant 33B, Kontich",
    },
    {
      id: "Veldkant 35D, Kontich",
      name: "Veldkant 35D, Kontich",
    },
    {
      id: "Veldkant 39, Kontich",
      name: "Veldkant 39, Kontich",
    },
    {
      id: "Veldkant 4, Kontich",
      name: "Veldkant 4, Kontich",
    },
    {
      id: "Gaston Geenslaan 11/B4, Leuven",
      name: "Gaston Geenslaan 11/B4, Leuven",
    },
    {
      id: "Bellevue 5, Gent",
      name: "Bellevue 5, Gent",
    },
    {
      id: "Nijverheidskaai 3, Kortrijk",
      name: "Nijverheidskaai 3, Kortrijk",
    },
  ],
};
