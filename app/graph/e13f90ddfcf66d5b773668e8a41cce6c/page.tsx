"use client"
import NodeOrigin from '@/components/ReactFlow/nodes/NodeOrigin';
import NodeText from '@/components/ReactFlow/nodes/NodeText';
import React, { useCallback, useMemo, useState } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  Position,
  useKeyPress,
} from 'reactflow';
import dagre from 'dagre'
import 'reactflow/dist/style.css';
import NodeImage from '@/components/ReactFlow/nodes/NodeImage';
import { useCounter } from 'usehooks-ts';



const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const initialNodes : Node[] = [
        { id: '1', type: 'NodeOrigin', position, data: { label: '1' } },
        { id: '2', type: 'NodeText', position, data: { title: 'Comprendre', colorLabel: '#a95c5c80' } },
        
        { id: 'AC21.01', type: 'NodeText', position, data: { 
            title: 'AC21.01', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 2,
                proof: `/pdf/babyfood.pdf`,
                context: "Au sein de la Ressource R401, j'ai entrepris une analyse approfondie de la stratégie de communication et de marketing d'une marque spécialisée dans les aliments destinés aux bébés. Mon étude a couvert divers aspects essentiels tels que la mission de l'entreprise, ses valeurs fondamentales, sa gamme de produits, son public cible et ses concurrents."
            },
            description: "Analyser la stratégie de communication ou marketing d'un acteur, d'une organisation, au regard d'un secteur ou d'un marché (stratégie, mission, valeurs...)"
         } },
         { id: 'AC21.02', type: 'NodeText', position, data: { 
            title: 'AC21.02', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: `/pdf/seoaudit.pdf`,
                context: "Lors de la ressource R306, j'ai eu l'opportunité d'effectuer un audit du site web de Rocket League, un jeu vidéo populaire. J'ai utilisé différents outils pour analyser son accessibilité, son référencement sur les moteurs de recherche et son audience. Grâce à cette analyse, j'ai pu dresser un bilan et identifier des possibilités d'amélioration afin d'augmenter sa visibilité sur les moteurs de recherche."
            
            },
            description: "Auditer un site web, une marque ou un service, en termes de trafic et de référencement."
         } },
         { id: 'AC21.03', type: 'NodeText', position, data: { 
            title: 'AC21.03', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                proof: `https://stats.kaitems.fr`,
                context: "Dans le cadre de la SAE 303, j'ai eu l'opportunité d'analyser un jeu de données en utilisant des outils et des technologies tels que Google Data Studio et AmCharts.js. Grâce à ces outils, j'ai pu traiter les données et les exploiter en créant des graphiques adaptés pour une meilleure visualisation et compréhension des informations contenues."
            },
            description: "Traiter des données avec des outils statistiques pour faciliter leur analyse et leur exploitation."
         } },
         { id: 'AC21.04', type: 'NodeText', position, data: { 
            title: 'AC21.04', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: `/pdf/mystudyroom.pdf`,
                context: "Dans le cadre du projet MyStudyRoom, j'ai collaboré avec mon groupe composé de Benoît Cabocel et Maxence Morot pour réaliser un User Journey Map. L'objectif était de définir les parcours d'un utilisateur cible sur un site dédié à la recherche de colocation."
            },
            description: "Identifier et décrire les parcours clients à partir d'enquêtes de terrain."
         } },
         { id: 'AC21.05', type: 'NodeText', position, data: { 
            title: 'AC21.05', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: `/pdf/mystudyroom.pdf`,
                context: "Dans le prolongement du projet MyStudyRoom, notre groupe a entrepris la réalisation d'une Empathy Map pour une personne en quête d'une colocation. J'ai été chargé de cartographier les différentes étapes de réflexion de cette personne cible, en identifiant les points de friction potentiels ainsi que les aspects satisfaisants."
            },
            description: "Cartographier les expériences utilisateur : points de contact, points de friction et de satisfaction, carte d'empathie."
         } },


        { id: '3', type: 'NodeText', position, data: { title: 'Concevoir', colorLabel: '#9f826480' } },

        { id: 'AC22.01', type: 'NodeText', position, data: { 
            title: 'AC22.01', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                proof: `/pdf/mystudyroom.pdf`,
                context: "Dans le projet MyStudyRoom, nous avons développé des services complémentaires pour simplifier la vie en colocation. Cela inclut un calendrier pour les tâches hebdomadaires, une géolocalisation pour localiser les colocataires et une messagerie instantanée pour faciliter les échanges."
            },
            description: "Co-concevoir un produit ou un service (proposition de valeur, fonctionnalités...)"
         } },
         { id: 'AC22.02', type: 'NodeText', position, data: { 
            title: 'AC22.02', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: `/pdf/mystudyroom.pdf`,
                context: "Dans le cadre du projet MyStudyRoom, j'ai participé en groupe à la conception d'une maquette pour l'application de colocation du même nom. Notre approche de conception a suivi le principe de l'Atomic Design enseigné par Monsieur Labille. La création de cette maquette interactive s'est appuyée sur des études préliminaires, notamment des analyses des sites concurrents, dans le but de fournir une expérience optimale aux futurs utilisateurs grâce à une ergonomie soignée."
            },
            description: "Produire une recommandation ergonomique à partir des tests utilisateurs (sur système fonctionnel, prototype ou maquette interactive)"
         } },
         { id: 'AC22.03', type: 'NodeText', position, data: { 
            title: 'AC22.03', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: `/pdf/sherlockholmesfestival.pdf`,
                context: "Dans le cadre de la SAE 302 axée sur l'organisation d'une fête sur le thème de Sherlock Holmes, mon groupe et moi avons développé un plan de communication adapté à notre public cible. Ce plan incluait la création de posters, d'invitations, de contreparties pour notre campagne de financement participatif sur Kickstarter, ainsi que la mise en place d'une stratégie de communication efficace sur les réseaux sociaux."
            },
            description: "Co-construire une recommandation stratégique (en structurant un plan d'action)"
         } },
         { id: 'AC22.04', type: 'NodeText', position, data: { 
            title: 'AC22.04', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: `/pdf/seoaudit.pdf`,
                context: "Grâce à l'enseignement très instructif de M. Valy sur le référencement au premier semestre, j'ai acquis une compréhension théorique. Cependant, je n'ai pas eu l'opportunité de mettre en pratique ces connaissances. Néanmoins, j'ai pu réaliser un audit de site."
            },
            
            description: "Optimiser le référencement d'un site web, d'un produit ou d'un service"
         } },
         { id: 'AC22.05', type: 'NodeText', position, data: { 
            title: 'AC22.05', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: null
            },
            description: "Mettre en place une présence sur les réseaux sociaux"
         } },

        { id: '4', type: 'NodeText', position, data: { title: 'Exprimer', colorLabel: '#dae17280' } },

        { id: 'AC23.01', type: 'NodeText', position, data: { 
            title: 'AC23.01', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: `/pdf/STRATDEV_Strat_BONNEAU_MOROT.pdf`,
                context: "Au cours de la Ressource R307, j'ai sélectionné les canaux de communication appropriés, tels que le réseau social Twitter, dans le cadre de la mise en place d'une stratégie globale. Cette stratégie comprenait la détermination des objectifs, l'identification des publics cibles et la création d'un message adapté."
            },
            description: "Produire un écrit journalistique sourcé et documenté"
         } },
         { id: 'AC23.02', type: 'NodeText', position, data: { 
            title: 'AC23.02', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: 'https://youtu.be/9Y3FJlN34UE',
                context: "Lors de la ressource R308, en collaboration avec mon groupe, nous avons réalisé une vidéo documentaire dans le style de Kombini qui portait sur le sujet du Deep Fake. De plus, nous avons élaboré la charte graphique de notre média, incluant son logo, ses animations et sa ligne éditoriale."
            },
            description: "Définir une iconographie (illustrations, photographies, vidéos)"
         } },
         { id: 'AC23.03', type: 'NodeText', position, data: { 
            title: 'AC23.03', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: '/pdf/chartgraph.pdf',
                context: `Au cours de la Ressource R208 au deuxième semestre de ma formation, j'ai eu l'opportunité de créer une identité visuelle unique pour l'entreprise fictive "Sur le Champ", spécialisée dans les escape games d'horreur avec des zombies. J'ai développé une charte graphique complète et originale qui reflète fidèlement l'identité et les valeurs de l'entreprise.`
            },
            description: "Créer et décliner une identité visuelle (charte graphique)"
         } },
         { id: 'AC23.04', type: 'NodeText', position, data: { 
            title: 'AC23.04', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: 'https://youtu.be/9Y3FJlN34UE',
                context: "Lors de la ressource R308, en collaboration avec mon groupe, nous avons réalisé une vidéo documentaire dans le style de Kombini qui portait sur le sujet du Deep Fake. De plus, nous avons élaboré la charte graphique de notre média, incluant son logo, ses animations et sa ligne éditoriale."
            },
            description: "Imaginer, écrire et scénariser en vue d'une communication multimédia ou transmédia"
         } },
         { id: 'AC23.05', type: 'NodeText', position, data: { 
            title: 'AC23.05', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: `/pdf/sherlockholmesfestival.pdf`,
                context: "Dans le cadre de la SAE 302 axée sur l'organisation d'une fête sur le thème de Sherlock Holmes, mon groupe et moi avons développé un plan de communication adapté à notre public cible. Ce plan incluait la création de posters, d'invitations, de contreparties pour notre campagne de financement participatif sur Kickstarter, ainsi que la mise en place d'une stratégie de communication efficace sur les réseaux sociaux."
            },
            description: "Réaliser, composer et produire pour une communication plurimédia"
         } },
         { id: 'AC23.06', type: 'NodeText', position, data: { 
            title: 'AC23.06', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                proof: `https://sunv1.kaitems.fr`,
                context: "Dans le cadre de la SAE 303, j'ai eu l'opportunité d'analyser un jeu de données en utilisant des outils et des technologies tels que Google Data Studio et AmCharts.js. Grâce à ces outils, j'ai pu traiter les données et les exploiter en créant des graphiques adaptés pour une meilleure visualisation et compréhension des informations contenues. J'ai aussi réalisé de la 3D comme par exemple ce générateur d'étoile."
            },
            description: "Élaborer et produire des animations, des designs sonores, des effets spéciaux, de la visualisation de données ou de la 3D"
         } },

        { id: '5', type: 'NodeText', position, data: { title: 'Développer', colorLabel: '#6e9d6380' } },

        { id: 'AC24.01', type: 'NodeText', position, data: { 
            title: 'AC24.01', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                proof: ``,
                context: "Malheureusement, je n'ai rien de concret à présenter ici, car il s'agit plutôt d'un apprentissage critique de première année. Mes projets de cette période ont été effacés. Cependant, je valorise l'approche responsive dans ma méthodologie de développement de code, même si elle n'est pas ma priorité initiale lors du démarrage d'un projet. Je privilégie toujours la fonctionnalité avant l'esthétique, car il est essentiel que l'esthétique s'adapte à la fonctionnalité et non l'inverse."
            },
            description: "Produire des pages et applications Web responsives"
         } },
         { id: 'AC24.02', type: 'NodeText', position, data: { 
            title: 'AC24.02', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                proof: ``,
                context: "Actuellement, je suis en train de développer mon portfolio en utilisant Next.js, un framework backend. J'ai intégré MongoDB et GitHub à mon portfolio, ce qui me permet d'utiliser différentes API pour récupérer automatiquement mes projets et blogs depuis GitHub. Ainsi, je peux les déployer sur mon serveur et les rendre accessibles sur mon portfolio."
            },
            description: "Mettre en place ou développer un back office"
         } },
         { id: 'AC24.03', type: 'NodeText', position, data: { 
            title: 'AC24.03', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                proof: `/pdf/device.pdf`,
                context: "Durant mon stage, j'ai eu l'opportunité de concevoir plusieurs pages pour l'application web Karnyx, qui offre des fonctionnalités complexes et diversifiées. J'ai pu créer des interfaces riches et hautement interactives."
            },
            description: "Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs"
         } },
         { id: 'AC24.04', type: 'NodeText', position, data: { 
            title: 'AC24.04', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: null,
                proof: ``,
                context: ""
            },
            description: "Modéliser les traitements d'une application Web"
         } },
         { id: 'AC24.05', type: 'NodeText', position, data: { 
            title: 'AC24.05', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                proof: ``,
                context: `Lors de mes projets personnels, j'opte pour l'utilisation de Node.js, qui s'avère être plus rapide que PHP. En effet, Node.js consomme moins de mémoire et bénéficie d'une exécution asynchrone. De plus, j'utilise le framework backend Next.js, qui me permet de déployer rapidement des sites web fonctionnels et optimisés. Grâce à Next.js, je peux générer une application légère avec un code minifié. J'exploite également la mise en cache des pages, le "lazy loading", ainsi que le chargement différé, afin d'optimiser les temps de chargement.`
            },
            description: "Optimiser une application web en termes de référencement et de temps de chargement"
         } },
         { id: 'AC24.06', type: 'NodeText', position, data: { 
            title: 'AC24.06', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                proof: ``,
                context: `Dans ma recherche d'une solution d'hébergement permettant le déploiement automatique de projets provenant de GitHub avec accès à l'invite de commande, je n'ai pas trouvé de service satisfaisant. J'ai donc opté pour l'achat d'un VPS (Virtual Private Server) pour répondre à ce besoin spécifique. C'est ainsi que le site sur lequel vous vous trouvez actuellement a pu être hébergé.`
            },
            description: "Configurer une solution d'hébergement adaptée aux besoins"
         } },
         




        { id: '6', type: 'NodeText', position, data: { title: 'Entreprendre', colorLabel: '#3d508580' } },

        { id: 'AC25.01', type: 'NodeText', position, data: { 
            title: 'AC25.01', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: ``,
                context: `En tant que développeur, nous avons instauré des réunions matinales de 10 minutes pour faire le point sur les réalisations de la veille, les difficultés rencontrées et les objectifs fixés pour la journée en cours. J'ai également utilisé GitLab et OpenProject afin d'adopter une méthodologie de travail en groupe plus efficace. Maintenant, j'utilise GitHub pour tous mes projets pour gérer mes projets de manière efficace.`
            },
            description: "Gérer un projet avec une méthode d'amélioration continue par exemple une méthode agile"
         } },




         { id: 'AC25.02', type: 'NodeText', position, data: { 
            title: 'AC25.02', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: ``,
                context: `Pendant mon parcours, j'ai pu développer une compréhension approfondie des divers rôles présents au sein de l'entreprise et identifier les acteurs clés qui les occupent.`
            },
            description: "Cartographier un écosystème (identification des acteurs, synthèse des propositions de valeur)"
         } },
         { id: 'AC25.03', type: 'NodeText', position, data: { 
            title: 'AC25.03', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: ``,
                context: `Durant le quatrième semestre de ma formation, j'ai effectué un stage de trois mois chez Anabasis Assets, une entreprise située à Saint-Denis qui compte une dizaine d'employés. Au cours de cette période, j'ai eu la chance de développer mon réseau professionnel en travaillant en étroite collaboration avec les divers membres de l'entreprise.`
            },
            description: "Initier la constitution d'un réseau professionnel"
         } },
         { id: 'AC25.04', type: 'NodeText', position, data: { 
            title: 'AC25.04', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: `/pdf/mystudyroom.pdf`,
                context: `Durant mon stage, j'ai travaillé en étroite collaboration avec M. Satisvar Tandabany, le chef développeur. Cependant, mes interactions ne se sont pas limitées à lui, j'ai également eu des échanges avec les ingénieurs de la connaissance afin de concevoir des interfaces ergonomiques adaptées à leurs besoins. Cette année, j'ai également eu l'occasion de collaborer en équipe dans le cadre des SAE.`
            },
            description: "Collaborer au sein des organisations"
         } },
         { id: 'AC25.05', type: 'NodeText', position, data: { 
            title: 'AC25.05', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 3,
                proof: ``,
                context: `Au cours de mon stage, j'ai rédigé différents documents tels que des spécifications, des rapports de gestion de travail et de la documentation concernant les erreurs liées au code. De plus, j'ai eu l'opportunité d'animer une réunion avec tous les membres de l'entreprise afin de présenter mon travail.`
            },
            description: "Maitriser les codes des productions écrites et orales professionnelles"
         } },
         { id: 'AC25.06', type: 'NodeText', position, data: { 
            title: 'AC25.06', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: null,
                proof: ``,
                context: ``
            },
            description: "Prendre en compte les contraintes juridiques"
         } },
  ];

export const initialEdges : Edge[] = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e1-3', source: '1', target: '3' },
        { id: 'e1-4', source: '1', target: '4' },
        { id: 'e1-5', source: '1', target: '5' },
        { id: 'e1-6', source: '1', target: '6' },

        // AC

        { id: '2-AC21.01', source: '2', target: 'AC21.01' },
        { id: '2-AC21.02', source: '2', target: 'AC21.02' },
        { id: '2-AC21.03', source: '2', target: 'AC21.03' },
        { id: '2-AC21.04', source: '2', target: 'AC21.04' },
        { id: '2-AC21.05', source: '2', target: 'AC21.05' },

        { id: '3-AC22.01', source: '3', target: 'AC22.01' },
        { id: '3-AC22.02', source: '3', target: 'AC22.02' },
        { id: '3-AC22.03', source: '3', target: 'AC22.03' },
        { id: '3-AC22.04', source: '3', target: 'AC22.04' },
        { id: '3-AC22.05', source: '3', target: 'AC22.05' },

        { id: '4-AC23.01', source: '4', target: 'AC23.01' },
        { id: '4-AC23.02', source: '4', target: 'AC23.02' },
        { id: '4-AC23.03', source: '4', target: 'AC23.03' },
        { id: '4-AC23.04', source: '4', target: 'AC23.04' },
        { id: '4-AC23.05', source: '4', target: 'AC23.05' },
        { id: '4-AC23.06', source: '4', target: 'AC23.06' },

        { id: '5-AC24.01', source: '5', target: 'AC24.01' },
        { id: '5-AC24.02', source: '5', target: 'AC24.02' },
        { id: '5-AC24.03', source: '5', target: 'AC24.03' },
        { id: '5-AC24.04', source: '5', target: 'AC24.04' },
        { id: '5-AC24.05', source: '5', target: 'AC24.05' },
        { id: '5-AC24.06', source: '5', target: 'AC24.06' },

        { id: '6-AC25.01', source: '6', target: 'AC25.01' },
        { id: '6-AC25.02', source: '6', target: 'AC25.02' },
        { id: '6-AC25.03', source: '6', target: 'AC25.03' },
        { id: '6-AC25.04', source: '6', target: 'AC25.04' },
        { id: '6-AC25.05', source: '6', target: 'AC25.05' },
        { id: '6-AC25.06', source: '6', target: 'AC25.06' },
];

// const order1 : { x: number, y:number }[] = []

// const otherNode : Node[] = []

// for (let i = 0; i < 26; i++) {
//     otherNode.push({ id: `babyfoodcampaign${i + 1}`, type: 'NodeImage', position: { x: -16000 + (2000 * (i % 4)), y: Math.floor(i/4) * 1200 },
//         data: {
//             src: `/babyfoodcampaign/${i + 1}.png`,
//             alt: '',
//             style: {width: '1920px', height: '1080px'},
//         },
//     })
//     order1.push({ x: -(-16000 + (2000 * (i % 4))), y: -(Math.floor(i/4) * 1200) })
// }










const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 400;
const nodeHeight = 100;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction: string = 'LR') => {
    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });
  
    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });
  
    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });
  
    dagre.layout(dagreGraph);
  
    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = (isHorizontal ? 'left' : 'top') as Position;
      node.sourcePosition = (isHorizontal ? 'right' : 'bottom') as Position;
  
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
  
      return node;
    });
  
    return { nodes, edges };
  };
  
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes as Node[],
        initialEdges as Edge[]
    );




function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
}

function fullScreen(boolean : boolean) {
    boolean ? document.documentElement.requestFullscreen() : document.exitFullscreen() 
}








function LayoutFlow () {

    // const arrowLeftPressed = useKeyPress('ArrowLeft');
    // const arrowRightPressed = useKeyPress('ArrowRight');
    // const escapePressed = useKeyPress('²');
    // const _1Pressed = useKeyPress('1');
    // const _2Pressed = useKeyPress('2');
    // const _3Pressed = useKeyPress('3');
    // const _4Pressed = useKeyPress('4');

    // const { setViewport, zoomIn, zoomOut, zoomTo } = useReactFlow();

    // const { count, setCount, increment, decrement, reset } = useCounter(0)
    // const [ valueSa, setValueSa ] = useState(0)

    // const [nodes, setNodes, onNodesChange] = useNodesState([...layoutedNodes,...otherNode]);



  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes); 
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const nodeTypes = useMemo(() => ({ NodeOrigin: NodeOrigin, NodeText: NodeText, NodeImage: NodeImage }), []);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      onlyRenderVisibleElements
      nodesDraggable={false}
      minZoom={0.2}
      proOptions={{ hideAttribution: true }}
      fitView
    >
            <Controls showInteractive={false}/>
            <MiniMap 
                // style={{background: '#1d1e24', opacity:0.}}
                nodeColor={(n) => {
                if (n.data?.colorLabel) return n.data?.colorLabel
                return '#fff';
                }}

                nodeStrokeColor={(n) => {
                    if (n.data?.colorLabel) return n.data?.colorLabel
                }}
            />
    </ReactFlow>
    </div>
  );
};



export default function FlowContainer () {
    return (
        <ReactFlowProvider>
            <LayoutFlow/>
        </ReactFlowProvider>
    )
}
