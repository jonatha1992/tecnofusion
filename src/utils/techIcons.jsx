import { 
    SiReact, SiVite, SiTailwindcss, SiMui, SiChartdotjs, SiLeaflet, 
    SiDjango, SiPostgresql, SiDocker, SiPython, SiJavascript, 
    SiHtml5, SiCss3, SiFirebase, SiNodedotjs, SiExpress, 
    SiJsonwebtokens, SiMongodb, SiTypescript, SiGit, SiGithub,
    SiBootstrap, SiSass, SiFigma, SiNextdotjs
} from 'react-icons/si';
import { TbApi, TbCode } from 'react-icons/tb';

// Mapping for SkillIcons.dev
// Keys are lowercased tech names, Values are the ID used by skillicons.dev
const skillIconsMap = {
    'react': 'react',
    'react.js': 'react',
    'vite': 'vite',
    'tailwind': 'tailwind',
    'tailwind css': 'tailwind',
    'material-ui': 'materialui',
    'mui': 'materialui',
    'django': 'django',
    'postgres': 'postgres',
    'postgresql': 'postgres',
    'docker': 'docker',
    'python': 'py',
    'javascript': 'js',
    'js': 'js',
    'html': 'html',
    'html5': 'html',
    'css': 'css',
    'css3': 'css',
    'firebase': 'firebase',
    'node': 'nodejs',
    'node.js': 'nodejs',
    'express': 'express',
    'express.js': 'express',
    'mongo': 'mongodb',
    'mongodb': 'mongodb',
    'typescript': 'ts',
    'ts': 'ts',
    'git': 'git',
    'github': 'github',
    'bootstrap': 'bootstrap',
    'sass': 'sass',
    'scss': 'sass',
    'figma': 'figma',
    'next': 'nextjs',
    'next.js': 'nextjs',
    'postman': 'postman',
    'linux': 'linux',
    'vscode': 'vscode',
    'mysql': 'mysql',
    'redux': 'redux',
    'jquery': 'jquery',
    'java': 'java',
    'php': 'php',
    'flutter': 'flutter',
    'dart': 'dart',
    'aws': 'aws',
    'azure': 'azure',
    'gcp': 'gcp',
    'graphql': 'graphql',
    'netlify': 'netlify',
    'vercel': 'vercel',
    'heroku': 'heroku',
    'prisma': 'prisma',
    'svelte': 'svelte',
    'vue': 'vue',
    'angular': 'angular',
    'kotlin': 'kotlin',
    'swift': 'swift',
    'c': 'c',
    'c++': 'cpp',
    'c#': 'cs',
    'r': 'r',
    'rust': 'rust',
    'go': 'go',
    'bash': 'bash',
};

// Fallback mapping for React Icons (when SkillIcons might not have it or we prefer the component)
// Although many are covered above, this handles ones NOT in skillIconsMap
// or if we decide to fallback.
const reactIconsMap = {
    'chart.js': <SiChartdotjs className="text-[#FF6384]" />,
    'leaflet': <SiLeaflet className="text-[#199900]" />,
    'django rest framework': <SiDjango className="text-[#A30000]" />, 
    'drf': <SiDjango className="text-[#A30000]" />,
    'jwt': <SiJsonwebtokens className="text-[#000000]" />,
};

export const getTechIcon = (techName) => {
    if (!techName) return null;

    const lowerTech = techName.toLowerCase().trim();

    // 1. Check SkillIcons Map
    if (skillIconsMap[lowerTech]) {
        const iconId = skillIconsMap[lowerTech];
        return (
            <img 
                src={`https://skillicons.dev/icons?i=${iconId}`} 
                alt={techName} 
                className="w-5 h-5 rounded-[2px]" // Rounded slightly to look good
            />
        );
    }

    // 2. Check React Icons Map (Specific overrides/fallbacks)
    if (reactIconsMap[lowerTech]) {
        return reactIconsMap[lowerTech];
    }

    // 3. Generic Fallbacks for things not explicitly mapped but might exist in logic
    // (We kept the old logic logic below just in case, but refined)

    // Check strict match from old list if not caught above
    const oldIconMap = {
         'react': <SiReact className="text-[#61DAFB]" />, // Redundant but safe
         // ... others are mostly covered by skillIconsMap
    };
    
    if (oldIconMap[lowerTech]) return oldIconMap[lowerTech];

    // Default icon
    return <TbCode className="text-gray-400" />;
};
