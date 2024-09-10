import React from 'react';
import { useEffect } from 'react';

const YogaAndMeditation = () => {
  const yogaExercises = [
    {
      id: 1,
      name: "Mountain Pose (Tadasana)",
      description: "A foundational yoga pose that improves posture, balance, and calm focus. It helps align the spine and strengthens the legs.",
      benefits: "Improves posture, strengthens legs, promotes calm focus.",
      image: "https://cdn.yogajournal.com/wp-content/uploads/2014/09/trail-running-tadasana-mountain-pose.jpg?width=730"
    },
    {
      id: 2,
      name: "Downward Dog (Adho Mukha Svanasana)",
      description: "A full-body stretch that strengthens the arms, legs, and core. It increases flexibility in the spine, hamstrings, and calves.",
      benefits: "Stretches the back, strengthens the arms and legs, improves flexibility.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSacX3-_SrWjUMzHarYEXYEiKd_i62shKQlIg&s"
    },
    {
      id: 3,
      name: "Child's Pose (Balasana)",
      description: "A gentle resting pose that calms the mind, stretches the back, and helps relieve tension in the shoulders and neck.",
      benefits: "Relieves tension, stretches the back, and calms the mind.",
      image: "https://www.yogateket.com/image/original/child_pose_extended.jpg"
    },
    {
      id: 4,
      name: "Warrior II (Virabhadrasana II)",
      description: "A powerful standing pose that strengthens the legs, opens the hips, and improves concentration.",
      benefits: "Strengthens legs, opens hips, improves focus.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSF0mgnKEG3PJcQMEforPVGtiLSTpkSlo8Ug&s"
    },
    {
      id: 5,
      name: "Tree Pose (Vrksasana)",
      description: "A balance pose that strengthens the legs and core while promoting stability and focus.",
      benefits: "Improves balance, strengthens legs, promotes focus.",
      image: "https://thumbs.dreamstime.com/z/young-yogi-man-practicing-yoga-standing-vrksasana-exercise-tree-pose-working-out-wearing-sportswear-white-top-black-pants-247279211.jpg"
    }
  ];

  const meditationExercises = [
    {
      id: 1,
      name: "Mindfulness Meditation",
      description: "Focus on the present moment by observing thoughts, emotions, and sensations without judgment.",
      benefits: "Reduces stress, enhances focus, improves emotional regulation.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVb1AVwdme0JXpR8Fk_PrTEDuxKiOo5L0Rg&s"
    },
    {
      id: 2,
      name: "Breathing Meditation (Pranayama)",
      description: "Focuses on controlled breathing to improve lung capacity and reduce anxiety.",
      benefits: "Reduces stress, increases oxygen flow, calms the mind.",
      image: "https://www.ommagazine.com/wp-content/uploads/bb-plugin/cache/DSCF0908_1-landscape-4d0e0700d17fffaa9ab4e0b10063bc72-60dddaf938b83.jpg"
    },
    {
      id: 3,
      name: "Loving-Kindness Meditation",
      description: "A meditation practice focused on developing feelings of love and compassion towards oneself and others.",
      benefits: "Increases compassion, promotes positive emotions, reduces anger.",
      image: "https://stonetreecreative.com/wp-content/uploads/2023/02/StonetreeCreative_loving_kindness_meditation_2e8e5550-0ac2-475f-b246-a728b1218814-e1675449180752.png"
    }
  ];

  useEffect(() => {
    // Scroll to top of the page whenever the location changes
    window.scrollTo(0, 0);
  }, );

  return (
    <section className="bg-gradient-to-b from-gray-100 to-gray-200 py-16">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Yoga & Meditation Guide</h1>
          <p className="text-lg text-gray-600 mt-4">
            Unlock the power of holistic well-being through expertly curated yoga and meditation exercises designed to enhance both mind and body.
          </p>
        </div>

        {/* Yoga Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">Yoga Exercises</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {yogaExercises.map((exercise) => (
              <div key={exercise.id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full md:w-1/2 rounded-lg mb-6 md:mb-0 md:mr-6"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900">{exercise.name}</h3>
                  <p className="text-gray-700 mt-4">{exercise.description}</p>
                  <p className="text-gray-500 mt-4"><strong>Benefits:</strong> {exercise.benefits}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meditation Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8">Meditation Techniques</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {meditationExercises.map((exercise) => (
              <div key={exercise.id} className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className="w-full md:w-1/2 rounded-lg mb-6 md:mb-0 md:mr-6"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900">{exercise.name}</h3>
                  <p className="text-gray-700 mt-4">{exercise.description}</p>
                  <p className="text-gray-500 mt-4"><strong>Benefits:</strong> {exercise.benefits}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogaAndMeditation;
