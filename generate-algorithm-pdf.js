const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create PDF document
const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 50, bottom: 50, left: 50, right: 50 }
});

// Output file
const outputPath = path.join(__dirname, 'CPAP_Mask_Selection_Algorithm_Documentation.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Helper function to add section
function addSection(title, fontSize = 16, isBold = true) {
  doc.moveDown(0.5);
  if (isBold) {
    doc.fontSize(fontSize).font('Helvetica-Bold').text(title);
  } else {
    doc.fontSize(fontSize).font('Helvetica').text(title);
  }
  doc.moveDown(0.3);
}

// Helper function to add text
function addText(text, fontSize = 11, isBold = false) {
  if (isBold) {
    doc.fontSize(fontSize).font('Helvetica-Bold').text(text, { continued: false });
  } else {
    doc.fontSize(fontSize).font('Helvetica').text(text, { continued: false });
  }
}

// Helper function to add bullet
function addBullet(text, fontSize = 10) {
  doc.fontSize(fontSize).font('Helvetica').text('• ' + text, { indent: 20 });
}

// Title Page
doc.fontSize(24).font('Helvetica-Bold').text('CPAP Mask Selection Algorithm', { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(18).font('Helvetica').text('Complete 12-Factor Integration System', { align: 'center' });
doc.moveDown(1);
doc.fontSize(14).font('Helvetica').text('Comprehensive Documentation', { align: 'center' });
doc.moveDown(2);
doc.fontSize(10).font('Helvetica-Oblique').text('Generated: ' + new Date().toLocaleDateString(), { align: 'center' });

// New Page
doc.addPage();

// Table of Contents
addSection('Table of Contents', 18, true);
addBullet('Factor Hierarchy & Weights', 11);
addBullet('Complete Decision Algorithm', 11);
addBullet('Step 1: Safety Check', 11);
addBullet('Step 2: Primary Mask Type', 11);
addBullet('Step 3: Strong Modifiers', 11);
addBullet('Step 4: Moderate Modifiers', 11);
addBullet('Step 5: Attachment Method', 11);
addBullet('Step 6: Accessory Selection', 11);
addBullet('Integration Example', 11);
addBullet('Summary', 11);

// New Page
doc.addPage();

// Introduction
addSection('Introduction', 18, true);
addText('This document describes the comprehensive CPAP mask selection algorithm that systematically integrates all 12 assessment factors with proper weighting, interaction logic, and decision routing.', 11);
doc.moveDown(0.5);
addText('The algorithm uses a 6-step decision process that ensures safety constraints are met first, then determines the primary mask type, applies modifiers, and selects appropriate attachments and accessories.', 11);

// New Page
doc.addPage();

// Factor Hierarchy
addSection('Factor Hierarchy & Weights', 18, true);
doc.moveDown(0.3);

addSection('Tier 1: Critical Safety Factors (Weight: 100 - Absolute)', 14, true);
addText('These create hard constraints that override other factors.', 11);
doc.moveDown(0.3);

addText('Assistant (Weight: 100)', 12, true);
addText('Impact: Attachment method REQUIRED', 11);
addText('Decision Rule: Magnetic quick-release or easy-removal mandatory', 11);
doc.moveDown(0.3);

addText('Eye/Reflux (Weight: 100)', 12, true);
addText('Impact: NO FULL FACE (aspiration risk)', 11);
addText('Decision Rule: Must use nasal-only masks', 11);
doc.moveDown(0.3);

addText('Drug (Vomiting) (Weight: 100)', 12, true);
addText('Impact: NO FULL FACE (aspiration risk)', 11);
addText('Decision Rule: Must use nasal-only masks', 11);
doc.moveDown(0.3);

addText('Implant (Weight: 70)', 12, true);
addText('Impact: NO MAGNETIC (interference risk)', 11);
addText('Decision Rule: Use non-magnetic attachments only', 11);

// New Page
doc.addPage();

addSection('Tier 2: Primary Mask Type Determinants (Weight: 95-85)', 14, true);
addText('These are the primary factors that determine mask category.', 11);
doc.moveDown(0.3);

addText('Breathing Type (Weight: 95)', 12, true);
addText('Impact: Primary mask category', 11);
addText('Decision Rule: Mouth → Full Face; Nose → Nasal; Mixed → Approaches', 11);
doc.moveDown(0.3);

addText('Nasal Obstruction (Weight: 90)', 12, true);
addText('Impact: Modifies mask category', 11);
addText('Decision Rule: Severe → Full Face; Mild → Dual; None → Nasal', 11);

// New Page
doc.addPage();

addSection('Tier 3: Strong Modifier Factors (Weight: 80-70)', 14, true);
addText('These significantly influence mask selection within category.', 11);
doc.moveDown(0.3);

addText('Claustrophobic (Weight: 80)', 12, true);
addText('Impact: Strong preference modifier', 11);
addText('Decision Rule: Prefer nasal pillows (minimal contact) over other options', 11);
doc.moveDown(0.3);

addText('Facial Hair (Weight: 75)', 12, true);
addText('Impact: Seal quality constraint', 11);
addText('Decision Rule: AVOID traditional nasal cushions; prefer pillows or total face', 11);
doc.moveDown(0.3);

addText('Sleep Position (Weight: 70)', 12, true);
addText('Impact: Design feature requirement', 11);
addText('Decision Rule: Side/stomach → tube-up designs; back → any design', 11);

// New Page
doc.addPage();

addSection('Tier 4: Moderate Modifier Factors (Weight: 60-50)', 14, true);
addText('These influence comfort and attachment selection.', 11);
doc.moveDown(0.3);

addText('Sleep Movement (Weight: 60)', 12, true);
addText('Impact: Stability requirement', 11);
addText('Decision Rule: High movement → enhanced headgear + prefer pillows', 11);
doc.moveDown(0.3);

addText('Skin Sensitivity (Weight: 55)', 12, true);
addText('Impact: Material/cushion selection', 11);
addText('Decision Rule: Gel/fabric options; hypoallergenic materials required', 11);
doc.moveDown(0.3);

addText('Adjustment Issues (Weight: 50)', 12, true);
addText('Impact: Attachment simplification', 11);
addText('Decision Rule: Auto-adjusting or simplified designs preferred', 11);

// New Page
doc.addPage();

// Complete Decision Algorithm
addSection('Complete Decision Algorithm', 18, true);
doc.moveDown(0.3);

addSection('STEP 1: Safety Check (Critical Constraints)', 14, true);
addText('The algorithm first checks for critical safety constraints that create hard limitations:', 11);
doc.moveDown(0.3);

addBullet('Eye/Reflux/Drug conditions → NO FULL FACE (aspiration risk)', 10);
addBullet('Assistant required → EASY REMOVAL REQUIRED (magnetic or quick-release)', 10);
addBullet('Implant present → NO MAGNETIC attachments', 10);
doc.moveDown(0.3);

addText('These constraints override all other factors and must be respected.', 11, true);

// New Page
doc.addPage();

addSection('STEP 2: Primary Mask Type (Breathing + Nasal)', 14, true);
addText('Determines the base mask category based on breathing pattern and nasal status:', 11);
doc.moveDown(0.3);

addBullet('Nose-only + No obstruction → Nasal Pillows/Mask (85-90% success)', 10);
addBullet('Mouth-only → Full Face (80-85% success, if not contraindicated)', 10);
addBullet('Mixed → Full Face OR Nasal + Chin Strap (75-85% success)', 10);
addBullet('Deviated Septum → Full Face preferred', 10);
addBullet('Seasonal Allergies → Consider heated humidifier', 10);

// New Page
doc.addPage();

addSection('STEP 3: Apply Strong Modifiers', 14, true);
addText('Applies high-weight factors that significantly modify the recommendation:', 11);
doc.moveDown(0.3);

addText('Claustrophobic (Weight: 80):', 12, true);
addBullet('If Nasal Mask → Switch to Nasal Pillows (minimal contact)', 10);
addBullet('If Full Face → Select minimal-contact designs (F40, F30, Amara View)', 10);
doc.moveDown(0.3);

addText('Facial Hair (Weight: 75):', 12, true);
addBullet('If Nasal Mask → REQUIRED switch to Nasal Pillows (traditional cushions fail)', 10);
addBullet('If Full Face → Add fabric liners OR use total face design', 10);
addBullet('Contraindication: AVOID traditional nasal cushion masks', 10);
doc.moveDown(0.3);

addText('Sleep Position (Weight: 70):', 12, true);
addBullet('Side/Stomach → Prioritize tube-up designs (P30i, N30i, DreamWear)', 10);
addBullet('Back → Any design acceptable', 10);
addBullet('Sitting → May indicate underlying condition (consider evaluation)', 10);

// New Page
doc.addPage();

addSection('STEP 4: Apply Moderate Modifiers', 14, true);
addText('Applies medium-weight factors that refine comfort and attachment needs:', 11);
doc.moveDown(0.3);

addText('Sleep Movement (Weight: 60):', 12, true);
addBullet('High movement → Enhanced 4-point headgear required', 10);
addBullet('Consider Nasal Pillows for better seal retention', 10);
doc.moveDown(0.3);

addText('Skin Sensitivity (Weight: 55):', 12, true);
addBullet('Select gel/fabric/memory foam options', 10);
addBullet('Required accessories: Gel cushions, hypoallergenic silicone, fabric covers', 10);
addBullet('Best options: AirTouch series (memory foam), Gel cushions', 10);
doc.moveDown(0.3);

addText('Adjustment Issues (Weight: 50):', 12, true);
addBullet('Prefer auto-adjusting headgear', 10);
addBullet('Magnetic clips ideal (if no implants)', 10);
addBullet('Simplified designs with fewer adjustment points', 10);

// New Page
doc.addPage();

addSection('STEP 5: Attachment Method Selection', 14, true);
addText('Scores all attachment options based on relevant factors:', 11);
doc.moveDown(0.3);

addText('Magnetic Quick-Release:', 12, true);
addBullet('Score: 100 if Assistant required (REQUIRED)', 10);
addBullet('Score: 90 if Adjustment issues (Highly recommended)', 10);
addBullet('Score: 0 if Implant present (CONTRAINDICATED)', 10);
doc.moveDown(0.3);

addText('Auto-Adjusting Headgear:', 12, true);
addBullet('Score: 90 if Adjustment issues', 10);
addBullet('Score: 60 otherwise (generally beneficial)', 10);
doc.moveDown(0.3);

addText('Enhanced 4-Point Headgear:', 12, true);
addBullet('Score: 85 if High movement (REQUIRED)', 10);
addBullet('Score: 70 if Some movement', 10);
doc.moveDown(0.3);

addText('Over-the-Head Design:', 12, true);
addBullet('Score: 75 if Side/Stomach sleeper (RECOMMENDED)', 10);
addBullet('Score: 50 otherwise', 10);

// New Page
doc.addPage();

addSection('STEP 6: Accessory Selection', 14, true);
addText('Determines required and recommended accessories:', 11);
doc.moveDown(0.3);

addText('ESSENTIAL Accessories:', 12, true);
addBullet('Heated Humidifier: Required for mouth breathing or seasonal allergies', 10);
doc.moveDown(0.3);

addText('HIGHLY RECOMMENDED Accessories:', 12, true);
addBullet('Gel Cushions/Memory Foam: For skin sensitivity', 10);
addBullet('Hypoallergenic Silicone: For allergies', 10);
addBullet('Fabric Cushion Covers: For facial hair or skin sensitivity', 10);
doc.moveDown(0.3);

addText('RECOMMENDED Accessories:', 12, true);
addBullet('Chin Strap: For mixed breathing with nasal mask trial', 10);
addBullet('Mouth Tape (MyoTape): Alternative to chin strap (if safe)', 10);

// New Page
doc.addPage();

// Integration Example
addSection('Complete Integration Example', 18, true);
doc.moveDown(0.3);

addText('Example Patient Profile:', 12, true);
addBullet('Breathing: Nose-only', 10);
addBullet('Nasal: No obstruction', 10);
addBullet('Sleep Position: Side', 10);
addBullet('Sleep Movement: All the time', 10);
addBullet('Claustrophobic: Yes', 10);
addBullet('Facial Hair: Yes', 10);
addBullet('Adjustment Issues: Yes', 10);
addBullet('Skin Sensitivity: Yes', 10);
doc.moveDown(0.5);

addText('Decision Flow:', 12, true);
doc.moveDown(0.3);

addText('STEP 1 - Safety Check:', 11, true);
addBullet('✅ Can use full face (no eye/drug issues)', 10);
addBullet('✅ Can use magnetic (no implants)', 10);
addBullet('✅ No easy removal required', 10);
doc.moveDown(0.3);

addText('STEP 2 - Primary Mask Type:', 11, true);
addBullet('Initial: Nasal Pillows or Nasal Mask (85-90% success)', 10);
doc.moveDown(0.3);

addText('STEP 3 - Strong Modifiers:', 11, true);
addBullet('Claustrophobic → Switch to Nasal Pillows', 10);
addBullet('Facial Hair → Confirm Nasal Pillows REQUIRED', 10);
addBullet('Side Sleeper → Prioritize tube-up designs', 10);
doc.moveDown(0.3);

addText('STEP 4 - Moderate Modifiers:', 11, true);
addBullet('High Movement → Enhanced headgear required', 10);
addBullet('Skin Sensitivity → Soft materials + accessories', 10);
addBullet('Adjustment Issues → Magnetic or auto-adjusting', 10);
doc.moveDown(0.3);

addText('FINAL RECOMMENDATION:', 12, true);
addBullet('Primary Mask: ResMed AirFit P30i (tube-up, side-sleeper friendly)', 10);
addBullet('Alternative: Philips DreamWear Silicone Pillows', 10);
addBullet('Attachment: Magnetic Quick-Release Headgear', 10);
addBullet('Accessories: Gel cushions, hypoallergenic silicone, fabric covers', 10);
addBullet('Success Rate: 80-90%', 10);

// New Page
doc.addPage();

// Summary
addSection('Algorithm Summary', 18, true);
doc.moveDown(0.3);

addText('Key Features:', 12, true);
addBullet('Systematic 6-step decision process', 10);
addBullet('Explicit factor weighting (100, 95, 80, 70, 60, 55, 50)', 10);
addBullet('Complete interaction logic between factors', 10);
addBullet('Safety constraints override all other factors', 10);
addBullet('Specific mask model recommendations with rationale', 10);
addBullet('Complete traceability (why each factor matters)', 10);
doc.moveDown(0.5);

addText('Factor Coverage:', 12, true);
addBullet('ALL 12 factors systematically considered', 10);
addBullet('Tier 1: Critical safety (absolute constraints)', 10);
addBullet('Tier 2: Primary mask type (category determination)', 10);
addBullet('Tier 3: Strong modifiers (significant influence)', 10);
addBullet('Tier 4: Moderate modifiers (comfort refinement)', 10);
doc.moveDown(0.5);

addText('Output Quality:', 12, true);
addBullet('Specific mask models (not just categories)', 10);
addBullet('Complete reasoning for each recommendation', 10);
addBullet('Success rate estimates', 10);
addBullet('Required and recommended accessories', 10);
addBullet('Contraindications and warnings', 10);

// Finalize PDF first
doc.end();

// Note: Page numbering would need to be done differently
// For now, the PDF will be generated without page numbers in footer
// You can add them manually or use a different approach

console.log('PDF generated successfully: ' + outputPath);
console.log('File location: ' + path.resolve(outputPath));

