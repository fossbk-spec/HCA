import assert from "node:assert/strict";
import test from "node:test";
import { LEARNING_TRACKS, getLearningTrack } from "../../src/lib/learning-paths-data";

test("learning tracks dataset contains the 5 foundational tracks from Master Blueprint", () => {
  assert.equal(LEARNING_TRACKS.length, 5);
  const expectedSlugs = [
    "the-human-odyssey",
    "evolution-of-ideas",
    "history-of-science",
    "world-epics-and-literature",
    "vietnam-civilization-heritage"
  ];
  assert.deepEqual(LEARNING_TRACKS.map((t) => t.slug), expectedSlugs);
});

test("every track has complete bilingual metadata and valid attributes", () => {
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const track of LEARNING_TRACKS) {
    assert.ok(track.id.trim(), "track id must not be empty");
    assert.ok(!seenIds.has(track.id), `duplicate track id: ${track.id}`);
    seenIds.add(track.id);

    assert.ok(track.slug.trim(), "track slug must not be empty");
    assert.ok(!seenSlugs.has(track.slug), `duplicate track slug: ${track.slug}`);
    seenSlugs.add(track.slug);

    assert.ok(track.titleEn.trim(), "titleEn must not be empty");
    assert.ok(track.titleVi.trim(), "titleVi must not be empty");
    assert.ok(track.descriptionEn.trim(), "descriptionEn must not be empty");
    assert.ok(track.descriptionVi.trim(), "descriptionVi must not be empty");
    assert.ok(track.badgeEn.trim(), "badgeEn must not be empty");
    assert.ok(track.badgeVi.trim(), "badgeVi must not be empty");
    assert.ok(track.estimatedHours > 0, "estimatedHours must be positive");
    assert.ok(track.steps.length >= 3, "track must have at least 3 steps");
  }
});

test("every learning step has valid curriculum structure and micro-quiz", () => {
  for (const track of LEARNING_TRACKS) {
    let stepNum = 1;
    for (const step of track.steps) {
      assert.equal(step.stepNumber, stepNum, `stepNumber sequence mismatch in ${track.slug}`);
      stepNum++;

      assert.ok(step.id.trim(), "step id must not be empty");
      assert.ok(step.titleEn.trim(), "step titleEn must not be empty");
      assert.ok(step.titleVi.trim(), "step titleVi must not be empty");
      assert.ok(step.summaryEn.trim(), "step summaryEn must not be empty");
      assert.ok(step.summaryVi.trim(), "step summaryVi must not be empty");
      assert.ok(step.coreTakeawayEn.trim(), "step coreTakeawayEn must not be empty");
      assert.ok(step.coreTakeawayVi.trim(), "step coreTakeawayVi must not be empty");

      // Verify quiz structure
      const q = step.quiz;
      assert.ok(q.questionEn.trim(), "quiz questionEn must not be empty");
      assert.ok(q.questionVi.trim(), "quiz questionVi must not be empty");
      assert.ok(q.optionsEn.length >= 3, "quiz must have at least 3 English options");
      assert.ok(q.optionsVi.length >= 3, "quiz must have at least 3 Vietnamese options");
      assert.equal(q.optionsEn.length, q.optionsVi.length, "options length must match across languages");
      assert.ok(q.correctIndex >= 0 && q.correctIndex < q.optionsEn.length, "correctIndex must be in bounds");
      assert.ok(q.explanationEn.trim(), "quiz explanationEn must not be empty");
      assert.ok(q.explanationVi.trim(), "quiz explanationVi must not be empty");
    }
  }
});

test("getLearningTrack helper retrieves track by slug or undefined", () => {
  const odyssey = getLearningTrack("the-human-odyssey");
  assert.ok(odyssey);
  assert.equal(odyssey?.slug, "the-human-odyssey");

  const nonExistent = getLearningTrack("non-existent-track-slug");
  assert.equal(nonExistent, undefined);
});
