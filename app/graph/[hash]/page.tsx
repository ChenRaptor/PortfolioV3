"use client"
import NodeOrigin from '@/components/ReactFlow/nodes/NodeOrigin';
import NodeText from '@/components/ReactFlow/nodes/NodeText';
import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Controls,
} from 'reactflow';
import dagre from 'dagre'
import 'reactflow/dist/style.css';



const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes = [
        { id: '1', type: 'NodeOrigin', position, data: { label: '1' } },
        { id: '2', type: 'NodeText', position, data: { title: 'Comprendre', colorLabel: '#a95c5c80' } },
        
        { id: 'AC21.01', type: 'NodeText', position, data: { 
            title: 'AC21.01', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            proof: {

            },
            description: "Analyser la stratégie de communication ou marketing d'un acteur, d'une organisation, au regard d'un secteur ou d'un marché (stratégie, mission, valeurs...)"
         } },
         { id: 'AC21.02', type: 'NodeText', position, data: { 
            title: 'AC21.02', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            description: "Auditer un site web, une marque ou un service, en termes de trafic et de référencement."
         } },
         { id: 'AC21.03', type: 'NodeText', position, data: { 
            title: 'AC21.03', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 4
            },
            description: "Traiter des données avec des outils statistiques pour faciliter leur analyse et leur exploitation."
         } },
         { id: 'AC21.04', type: 'NodeText', position, data: { 
            title: 'AC21.04', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            description: "Identifier et décrire les parcours clients à partir d'enquêtes de terrain."
         } },
         { id: 'AC21.05', type: 'NodeText', position, data: { 
            title: 'AC21.05', 
            colorLabel: '#a95c5c80',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            description: "Cartographier les expériences utilisateur : points de contact, points de friction et de satisfaction, carte d'empathie."
         } },


        { id: '3', type: 'NodeText', position, data: { title: 'Concevoir', colorLabel: '#9f826480' } },

        { id: 'AC22.01', type: 'NodeText', position, data: { 
            title: 'AC22.01', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: 4
            },
            description: "Co-concevoir un produit ou un service (proposition de valeur, fonctionnalités...)"
         } },
         { id: 'AC22.02', type: 'NodeText', position, data: { 
            title: 'AC22.02', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: 4
            },
            description: "Produire une recommandation ergonomique à partir des tests utilisateurs (sur système fonctionnel, prototype ou maquette interactive)"
         } },
         { id: 'AC22.03', type: 'NodeText', position, data: { 
            title: 'AC22.03', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            description: "Co-construire une recommandation stratégique (en structurant un plan d'action)"
         } },
         { id: 'AC22.04', type: 'NodeText', position, data: { 
            title: 'AC22.04', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            description: "Optimiser le référencement d'un site web, d'un produit ou d'un service"
         } },
         { id: 'AC22.05', type: 'NodeText', position, data: { 
            title: 'AC22.05', 
            colorLabel: '#9f826480',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            description: "Mettre en place une présence sur les réseaux sociaux"
         } },

        { id: '4', type: 'NodeText', position, data: { title: 'Exprimer', colorLabel: '#dae17280' } },

        { id: 'AC23.01', type: 'NodeText', position, data: { 
            title: 'AC23.01', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 4
            },
            description: "Produire un écrit journalistique sourcé et documenté"
         } },
         { id: 'AC23.02', type: 'NodeText', position, data: { 
            title: 'AC23.02', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 2
            },
            description: "Définir une iconographie (illustrations, photographies, vidéos)"
         } },
         { id: 'AC23.03', type: 'NodeText', position, data: { 
            title: 'AC23.03', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 4
            },
            description: "Créer et décliner une identité visuelle (charte graphique)"
         } },
         { id: 'AC23.04', type: 'NodeText', position, data: { 
            title: 'AC23.04', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 4
            },
            description: "Imaginer, écrire et scénariser en vue d'une communication multimédia ou transmédia"
         } },
         { id: 'AC23.05', type: 'NodeText', position, data: { 
            title: 'AC23.05', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            description: "Réaliser, composer et produire pour une communication plurimédia"
         } },
         { id: 'AC23.06', type: 'NodeText', position, data: { 
            title: 'AC23.06', 
            colorLabel: '#dae17280',
            type: 'auto-eval',
            value: {
                acquisition: 3
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
                content: "Bien sûre",
                proof: "https://kaitems.fr"
            },
            description: "Produire des pages et applications Web responsives"
         } },
         { id: 'AC24.02', type: 'NodeText', position, data: { 
            title: 'AC24.02', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                content: "Bien sûre",
                proof: "https://kaitems.fr"
            },
            description: "Mettre en place ou développer un back office"
         } },
         { id: 'AC24.03', type: 'NodeText', position, data: { 
            title: 'AC24.03', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                content: "Bien sûre",
                proof: "https://kaitems.fr"
            },
            description: "Intégrer, produire ou développer des interactions riches ou des dispositifs interactifs"
         } },
         { id: 'AC24.04', type: 'NodeText', position, data: { 
            title: 'AC24.04', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                content: "Bien sûre",
                proof: "https://kaitems.fr"
            },
            description: "Modéliser les traitements d'une application Web"
         } },
         { id: 'AC24.05', type: 'NodeText', position, data: { 
            title: 'AC24.05', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                content: "Bien sûre",
                proof: "https://kaitems.fr"
            },
            description: "Optimiser une application web en termes de référencement et de temps de chargement"
         } },
         { id: 'AC24.06', type: 'NodeText', position, data: { 
            title: 'AC24.06', 
            colorLabel: '#6e9d6380',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                content: "Bien sûre",
                proof: "https://kaitems.fr"
            },
            description: "Configurer une solution d'hébergement adaptée aux besoins"
         } },
         
        { id: '6', type: 'NodeText', position, data: { title: 'Entreprendre', colorLabel: '#3d508580' } },

        { id: 'AC25.01', type: 'NodeText', position, data: { 
            title: 'AC25.01', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 4,
                content: "Bien sûre",
                proof: "https://kaitems.fr"
            },
            description: "Gérer un projet avec une méthode d'amélioration continue par exemple une méthode agile"
         } },
         { id: 'AC25.02', type: 'NodeText', position, data: { 
            title: 'AC25.02', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            description: "Cartographier un écosystème (identification des acteurs, synthèse des propositions de valeur)"
         } },
         { id: 'AC25.03', type: 'NodeText', position, data: { 
            title: 'AC25.03', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 4
            },
            description: "Initier la constitution d'un réseau professionnel"
         } },
         { id: 'AC25.04', type: 'NodeText', position, data: { 
            title: 'AC25.04', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 4
            },
            description: "Collaborer au sein des organisations"
         } },
         { id: 'AC25.05', type: 'NodeText', position, data: { 
            title: 'AC25.05', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 4
            },
            description: "Maitriser les codes des productions écrites et orales professionnelles"
         } },
         { id: 'AC25.06', type: 'NodeText', position, data: { 
            title: 'AC25.06', 
            colorLabel: '#3d508580',
            type: 'auto-eval',
            value: {
                acquisition: 3
            },
            description: "Prendre en compte les contraintes juridiques"
         } },
  ];

export const initialEdges = [
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









const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 400;
const nodeHeight = 100;

const getLayoutedElements = (nodes, edges, direction = 'LR') => {
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
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);













const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const nodeTypes = useMemo(() => ({ NodeOrigin: NodeOrigin, NodeText: NodeText }), []);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
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
      fitView
    >
      <Panel position="top-right">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </Panel>
      <Controls showInteractive={false}/>
    </ReactFlow>
    </div>
  );
};

export default LayoutFlow;