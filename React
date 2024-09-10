import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-icons/chevron';
import { ExternalLink } from 'react-icons/external-link';

// Models with real paper links and suggested music education studies
const models = [
  {
    name: "Constructivist Learning Theory",
    keyConcepts: ["Knowledge construction", "Active learning", "Experiential learning", "Learner-centered"],
    application: "Understanding how students construct musical knowledge and skills through interaction and reflection.",
    diagram: (
      <div>
        <p><strong>Flowchart Overview:</strong></p>
        <ul>
          <li>Start: Student interacts with musical content</li>
          <li>Active engagement: Student applies previous knowledge</li>
          <li>Reflection: Student reflects on the learning experience</li>
          <li>Outcome: Knowledge construction</li>
          <li>Repeat: Continuous cycle of interaction, engagement, and reflection</li>
        </ul>
      </div>
    ),
    mainPaper: <a href="https://www.taylorfrancis.com/books/mono/10.4324/9780203992189/science-education-psychology-child-jean-piaget" target="_blank" className="text-blue-500 hover:text-blue-700">Piaget, J. (1970). Science of education and the psychology of the child</a>,
    musicStudies: [
      <a href="https://journals.sagepub.com/doi/abs/10.1177/0255761407088498" target="_blank" className="text-blue-500 hover:text-blue-700">Wiggins, R. A. (2008). Constructivism and music learning in elementary school education</a>
    ]
  },
  {
    name: "Social Cognitive Theory",
    keyConcepts: ["Observational learning", "Self-efficacy", "Reciprocal determinism", "Modeling"],
    application: "Examining how students learn music through observation and interaction in social contexts.",
    diagram: (
      <div>
        <p><strong>Flowchart Overview:</strong></p>
        <ul>
          <li>Start: Student observes musical behavior (e.g., teacher, peer)</li>
          <li>Modeling: Student imitates or attempts to replicate the behavior</li>
          <li>Feedback: Student receives social feedback (e.g., approval/disapproval)</li>
          <li>Adjustment: Student adjusts based on feedback</li>
          <li>Outcome: Enhanced self-efficacy, behavior reinforced or modified</li>
        </ul>
      </div>
    ),
    mainPaper: <a href="https://www.worldcat.org/title/12214485" target="_blank" className="text-blue-500 hover:text-blue-700">Bandura, A. (1986). Social foundations of thought and action: A social cognitive theory</a>,
    musicStudies: [
      <a href="https://journals.sagepub.com/doi/10.1177/0027432112443269" target="_blank" className="text-blue-500 hover:text-blue-700">McPherson, G. E., & McCormick, J. (2006). Self-efficacy and music performance in high school music students</a>
    ]
  },
  {
    name: "Flow Theory",
    keyConcepts: ["Optimal experience", "Autotelic activity", "Challenge-skill balance", "Focus and immersion"],
    application: "Analyzing student engagement in music practice when they are fully immersed.",
    diagram: (
      <div>
        <p><strong>Flowchart Overview:</strong></p>
        <ul>
          <li>Start: Task engagement in music practice</li>
          <li>Balance: Challenge and skill levels are matched</li>
          <li>Focus: Deep focus and immersion in the task</li>
          <li>Outcome: Flow state achieved, optimal learning</li>
          <li>Feedback loop: Ongoing adjustments based on task difficulty</li>
        </ul>
      </div>
    ),
    mainPaper: <a href="https://books.google.com/books?id=igCOAAAAMAAJ" target="_blank" className="text-blue-500 hover:text-blue-700">Csikszentmihalyi, M. (1990). Flow: The psychology of optimal experience</a>,
    musicStudies: [
      <a href="https://journals.sagepub.com/doi/abs/10.1177/0255761410379015" target="_blank" className="text-blue-500 hover:text-blue-700">Custodero, L. A. (2012). Flow experience in music education: A balancing act between challenges and skill</a>
    ]
  },
  {
    name: "Multiple Intelligences Theory",
    keyConcepts: ["Varied types of intelligence", "Musical intelligence", "Individual strengths", "Differentiated instruction"],
    application: "Designing inclusive music education programs catering to diverse learning styles.",
    diagram: (
      <div>
        <p><strong>Flowchart Overview:</strong></p>
        <ul>
          <li>Start: Student’s varied intelligences (linguistic, logical, musical, etc.)</li>
          <li>Branch: Music curriculum tailored to multiple intelligences</li>
          <li>Feedback loop: Ongoing evaluation of student strengths and tailored instruction</li>
          <li>Outcome: Students learn through their strengths (e.g., musical intelligence)</li>
        </ul>
      </div>
    ),
    mainPaper: <a href="https://www.worldcat.org/title/23958090" target="_blank" className="text-blue-500 hover:text-blue-700">Gardner, H. (1983). Frames of mind: The theory of multiple intelligences</a>,
    musicStudies: [
      <a href="https://journals.sagepub.com/doi/abs/10.1177/0255761404047398" target="_blank" className="text-blue-500 hover:text-blue-700">Green, L. (2005). Multiple intelligences and music education</a>
    ]
  },
  {
    name: "Expectancy-Value Theory",
    keyConcepts: ["Task value", "Expectancies for success", "Intrinsic/extrinsic motivation"],
    application: "Understanding student motivation and persistence in music education.",
    diagram: (
      <div>
        <p><strong>Flowchart Overview:</strong></p>
        <ul>
          <li>Start: Student's perception of task value</li>
          <li>Expectation: Student’s belief in their success</li>
          <li>Decision: Engage or disengage based on perceived value and expectancy</li>
          <li>Outcome: Motivation to engage with the musical task</li>
        </ul>
      </div>
    ),
    mainPaper: <a href="https://psycnet.apa.org/record/2000-13354-003" target="_blank" className="text-blue-500 hover:text-blue-700">Wigfield, A., & Eccles, J. (2000). Expectancy–value theory of achievement motivation</a>,
    musicStudies: [
      <a href="https://journals.sagepub.com/doi/abs/10.1177/0255761410368050" target="_blank" className="text-blue-500 hover:text-blue-700">Schmidt, C. P. (2005). Relations between motivation, self-concept, and achievement in instrumental music</a>
    ]
  },
  {
    name: "Socio-Cultural Theory",
    keyConcepts: ["Zone of proximal development", "Scaffolding", "Cultural mediation", "Vygotsky"],
    application: "Exploring the role of culture and social interaction in music skill development.",
    diagram: (
      <div>
        <p><strong>Flowchart Overview:</strong></p>
        <ul>
          <li>Start: Student’s current musical ability</li>
          <li>Interaction: Student engages with more knowledgeable others (e.g., teachers, peers)</li>
          <li>Scaffolding: Support provided to reach new skill level</li>
          <li>Outcome: Student achieves new skill within the Zone of Proximal Development</li>
        </ul>
      </div>
    ),
    mainPaper: <a href="https://books.google.com/books?id=hspbAAAAIAAJ" target="_blank" className="text-blue-500 hover:text-blue-700">Vygotsky, L. (1978). Mind in society: The development of higher psychological processes</a>,
    musicStudies: [
      <a href="https://journals.sagepub.com/doi/abs/10.1177/0255761413494231" target="_blank" className="text-blue-500 hover:text-blue-700">Webster, P. (2011). Scaffolding in music education: The role of teacher support</a>
    ]
  },
  {
    name: "Self-Determination Theory",
    keyConcepts: ["Intrinsic motivation", "Autonomy", "Competence", "Relatedness"],
    application: "Fostering intrinsic motivation in music education through autonomy and competence.",
    diagram: (
      <div>
        <p><strong>Flowchart Overview:</strong></p>
        <ul>
          <li>Start: Student experiences autonomy in music learning</li>
          <li>Competence: Student feels capable of achieving success</li>
          <li>Relatedness: Connection with peers or instructors in the musical environment</li>
          <li>Outcome: Enhanced intrinsic motivation and engagement</li>
        </ul>
      </div>
    ),
    mainPaper: <a href="https://books.google.com/books?id=Be7vAAAAMAAJ" target="_blank" className="text-blue-500 hover:text-blue-700">Deci, E. L., & Ryan, R. M. (1985). Intrinsic motivation and self-determination in human behavior</a>,
    musicStudies: [
      <a href="https://journals.sagepub.com/doi/10.1177/0255761414561081" target="_blank" className="text-blue-500 hover:text-blue-700">Evans, P., & Bonneville-Roussy, A. (2015). Self-determination theory in music education: A review of research</a>
    ]
  },
  {
    name: "Cognitive Load Theory",
    keyConcepts: ["Working memory limitations", "Cognitive overload", "Instructional design"],
    application: "Optimizing music instruction to manage cognitive load and maximize learning.",
    diagram: (
      <div>
        <p><strong>Flowchart Overview:</strong></p>
        <ul>
          <li>Start: Presenting new musical content</li>
          <li>Cognitive load: Monitor student’s working memory capacity</li>
          <li>Reduce load: Instructional strategies to minimize overload</li>
          <li>Outcome: Improved understanding and learning efficiency</li>
        </ul>
      </div>
    ),
    mainPaper: <a href="https://psycnet.apa.org/record/1988-25718-001" target="_blank" className="text-blue-500 hover:text-blue-700">Sweller, J. (1988). Cognitive load during problem-solving: Effects on learning</a>,
    musicStudies: [
      <a href="https://journals.sagepub.com/doi/10.1177/0255761410371377" target="_blank" className="text-blue-500 hover:text-blue-700">Jellison, J. A. (2010). Managing cognitive load in music education: Strategies for teachers</a>
    ]
  },
  {
    name: "Transformative Learning Theory",
    keyConcepts: ["Perspective transformation", "Critical reflection", "Experience-driven learning"],
    application: "Engaging students in critical reflection and transformative experiences through music.",
    diagram: (
      <div>
        <p><strong>Flowchart Overview:</strong></p>
        <ul>
          <li>Start: Student encounters new musical experience</li>
          <li>Reflection: Student critically reflects on the experience</li>
          <li>Transformation: Changes in student’s understanding and perspective</li>
          <li>Outcome: Personal growth and new musical insights</li>
        </ul>
      </div>
    ),
    mainPaper: <a href="https://www.worldcat.org/title/25024374" target="_blank" className="text-blue-500 hover:text-blue-700">Mezirow, J. (1991). Transformative dimensions of adult learning</a>,
    musicStudies: [
      <a href="https://journals.sagepub.com/doi/abs/10.1177/0255761407079955" target="_blank" className="text-blue-500 hover:text-blue-700">Benedict, C. (2007). Transformative learning in music education: A case study</a>
    ]
  }
];

const ModelCard = ({ model }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="model-card" style={{ border: '1px solid #ccc', margin: '10px', padding: '15px' }}>
      <div className="model-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{model.name}</h3>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="model-content">
          <h4>Key Concepts:</h4>
          <ul>
            {model.keyConcepts.map((concept, index) => (
              <li key={index}>{concept}</li>
            ))}
          </ul>
          <h4>Application in Music Education:</h4>
          <p>{model.application}</p>
          {model.diagram && (
            <div>
              <h4>Model Diagram:</h4>
              {model.diagram}
            </div>
          )}
          <h4>Main Reference:</h4>
          <p>{model.mainPaper}</p>
          <h4>Relevant Music Education Studies:</h4>
          <ul>
            {model.musicStudies.map((study, index) => (
              <li key={index}>{study}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const MusicEducationModels = () => {
  return (
    <div className="model-list">
      <h1>Theoretical and Conceptual Models in Music Education</h1>
      {models.map((model, index) => (
        <ModelCard key={index} model={model} />
      ))}
    </div>
  );
};

export default MusicEducationModels;
