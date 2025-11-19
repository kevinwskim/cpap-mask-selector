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

// New Page - Visual Overview
doc.addPage();

addSection('Algorithm Flow Overview', 18, true);
doc.moveDown(0.3);

// Draw main flow diagram
const startX = 50;
const startY = 100;
const boxWidth = 150;
const boxHeight = 40;
const spacing = 60;

// Step 1 Box
doc.rect(startX, startY, boxWidth, boxHeight)
   .fillAndStroke('#FF6B6B', '#000000');
doc.fontSize(10).font('Helvetica-Bold').fillColor('white')
   .text('STEP 1', startX + 10, startY + 5, { width: boxWidth - 20, align: 'center' });
doc.fontSize(8).text('Safety Check', startX + 10, startY + 18, { width: boxWidth - 20, align: 'center' });
doc.fillColor('black');

// Arrow down
doc.moveTo(startX + boxWidth/2, startY + boxHeight)
   .lineTo(startX + boxWidth/2, startY + boxHeight + 20)
   .stroke();

// Step 2 Box
doc.rect(startX, startY + boxHeight + 20, boxWidth, boxHeight)
   .fillAndStroke('#4ECDC4', '#000000');
doc.fontSize(10).font('Helvetica-Bold').fillColor('white')
   .text('STEP 2', startX + 10, startY + boxHeight + 25, { width: boxWidth - 20, align: 'center' });
doc.fontSize(8).text('Primary Mask Type', startX + 10, startY + boxHeight + 38, { width: boxWidth - 20, align: 'center' });
doc.fillColor('black');

// Arrow down
doc.moveTo(startX + boxWidth/2, startY + boxHeight*2 + 20)
   .lineTo(startX + boxWidth/2, startY + boxHeight*2 + 40)
   .stroke();

// Step 3 Box
doc.rect(startX, startY + boxHeight*2 + 40, boxWidth, boxHeight)
   .fillAndStroke('#FFE66D', '#000000');
doc.fontSize(10).font('Helvetica-Bold').fillColor('black')
   .text('STEP 3', startX + 10, startY + boxHeight*2 + 45, { width: boxWidth - 20, align: 'center' });
doc.fontSize(8).text('Strong Modifiers', startX + 10, startY + boxHeight*2 + 58, { width: boxWidth - 20, align: 'center' });

// Arrow down
doc.moveTo(startX + boxWidth/2, startY + boxHeight*3 + 40)
   .lineTo(startX + boxWidth/2, startY + boxHeight*3 + 60)
   .stroke();

// Step 4 Box
doc.rect(startX, startY + boxHeight*3 + 60, boxWidth, boxHeight)
   .fillAndStroke('#95E1D3', '#000000');
doc.fontSize(10).font('Helvetica-Bold').fillColor('black')
   .text('STEP 4', startX + 10, startY + boxHeight*3 + 65, { width: boxWidth - 20, align: 'center' });
doc.fontSize(8).text('Moderate Modifiers', startX + 10, startY + boxHeight*3 + 78, { width: boxWidth - 20, align: 'center' });

// Arrow down
doc.moveTo(startX + boxWidth/2, startY + boxHeight*4 + 60)
   .lineTo(startX + boxWidth/2, startY + boxHeight*4 + 80)
   .stroke();

// Step 5 Box
doc.rect(startX, startY + boxHeight*4 + 80, boxWidth, boxHeight)
   .fillAndStroke('#A8E6CF', '#000000');
doc.fontSize(10).font('Helvetica-Bold').fillColor('black')
   .text('STEP 5', startX + 10, startY + boxHeight*4 + 85, { width: boxWidth - 20, align: 'center' });
doc.fontSize(8).text('Attachment Method', startX + 10, startY + boxHeight*4 + 98, { width: boxWidth - 20, align: 'center' });

// Arrow down
doc.moveTo(startX + boxWidth/2, startY + boxHeight*5 + 80)
   .lineTo(startX + boxWidth/2, startY + boxHeight*5 + 100)
   .stroke();

// Step 6 Box
doc.rect(startX, startY + boxHeight*5 + 100, boxWidth, boxHeight)
   .fillAndStroke('#FFD3A5', '#000000');
doc.fontSize(10).font('Helvetica-Bold').fillColor('black')
   .text('STEP 6', startX + 10, startY + boxHeight*5 + 105, { width: boxWidth - 20, align: 'center' });
doc.fontSize(8).text('Accessory Selection', startX + 10, startY + boxHeight*5 + 118, { width: boxWidth - 20, align: 'center' });

// Arrow down to final result
doc.moveTo(startX + boxWidth/2, startY + boxHeight*6 + 100)
   .lineTo(startX + boxWidth/2, startY + boxHeight*6 + 120)
   .stroke();

// Final Result Box
doc.rect(startX - 25, startY + boxHeight*6 + 120, boxWidth + 50, boxHeight + 10)
   .fillAndStroke('#667EEA', '#000000');
doc.fontSize(11).font('Helvetica-Bold').fillColor('white')
   .text('FINAL RECOMMENDATION', startX - 15, startY + boxHeight*6 + 125, { width: boxWidth + 30, align: 'center' });
doc.fontSize(9).text('Mask + Attachment + Accessories', startX - 15, startY + boxHeight*6 + 142, { width: boxWidth + 30, align: 'center' });
doc.fillColor('black');

// Add side annotations for factors
const rightX = startX + boxWidth + 30;
doc.fontSize(8).font('Helvetica').fillColor('black');

// Step 1 factors
doc.text('Factors:', rightX, startY + 5);
doc.text('• Eye/Reflux/Drug', rightX, startY + 15);
doc.text('• Assistant', rightX, startY + 25);
doc.text('• Implant', rightX, startY + 35);

// Step 2 factors
doc.text('Factors:', rightX, startY + boxHeight + 25);
doc.text('• Breathing Type', rightX, startY + boxHeight + 35);
doc.text('• Nasal Status', rightX, startY + boxHeight + 45);

// Step 3 factors
doc.text('Factors:', rightX, startY + boxHeight*2 + 45);
doc.text('• Claustrophobic', rightX, startY + boxHeight*2 + 55);
doc.text('• Facial Hair', rightX, startY + boxHeight*2 + 65);
doc.text('• Sleep Position', rightX, startY + boxHeight*2 + 75);

// Step 4 factors
doc.text('Factors:', rightX, startY + boxHeight*3 + 65);
doc.text('• Sleep Movement', rightX, startY + boxHeight*3 + 75);
doc.text('• Skin Sensitivity', rightX, startY + boxHeight*3 + 85);
doc.text('• Adjustment Issues', rightX, startY + boxHeight*3 + 95);

// Step 5 factors
doc.text('All relevant', rightX, startY + boxHeight*4 + 85);
doc.text('factors scored', rightX, startY + boxHeight*4 + 95);

// Step 6 factors
doc.text('All relevant', rightX, startY + boxHeight*5 + 105);
doc.text('factors scored', rightX, startY + boxHeight*5 + 115);

doc.moveDown(8);

// New Page - Factor Hierarchy Visual
doc.addPage();

addSection('Factor Hierarchy & Weights', 18, true);
doc.moveDown(0.3);

// Draw factor hierarchy pyramid
const pyramidX = 50;
const pyramidY = 100;
const tierWidth = 450;
const tierHeight = 50;
const tierSpacing = 5;

// Tier 1 - Top (Critical)
doc.rect(pyramidX, pyramidY, tierWidth, tierHeight)
   .fillAndStroke('#FF6B6B', '#000000');
doc.fontSize(12).font('Helvetica-Bold').fillColor('white')
   .text('TIER 1: Critical Safety (Weight: 100)', pyramidX + 10, pyramidY + 10);
doc.fontSize(9).text('Assistant • Eye/Reflux • Drug • Implant', pyramidX + 10, pyramidY + 28);
doc.fillColor('black');

// Tier 2
doc.rect(pyramidX + 20, pyramidY + tierHeight + tierSpacing, tierWidth - 40, tierHeight)
   .fillAndStroke('#4ECDC4', '#000000');
doc.fontSize(12).font('Helvetica-Bold').fillColor('white')
   .text('TIER 2: Primary Determinants (Weight: 95-85)', pyramidX + 30, pyramidY + tierHeight + tierSpacing + 10);
doc.fontSize(9).text('Breathing Type • Nasal Obstruction', pyramidX + 30, pyramidY + tierHeight + tierSpacing + 28);
doc.fillColor('black');

// Tier 3
doc.rect(pyramidX + 40, pyramidY + (tierHeight + tierSpacing)*2, tierWidth - 80, tierHeight)
   .fillAndStroke('#FFE66D', '#000000');
doc.fontSize(12).font('Helvetica-Bold').fillColor('black')
   .text('TIER 3: Strong Modifiers (Weight: 80-70)', pyramidX + 50, pyramidY + (tierHeight + tierSpacing)*2 + 10);
doc.fontSize(9).text('Claustrophobic • Facial Hair • Sleep Position', pyramidX + 50, pyramidY + (tierHeight + tierSpacing)*2 + 28);

// Tier 4
doc.rect(pyramidX + 60, pyramidY + (tierHeight + tierSpacing)*3, tierWidth - 120, tierHeight)
   .fillAndStroke('#95E1D3', '#000000');
doc.fontSize(12).font('Helvetica-Bold').fillColor('black')
   .text('TIER 4: Moderate Modifiers (Weight: 60-50)', pyramidX + 70, pyramidY + (tierHeight + tierSpacing)*3 + 10);
doc.fontSize(9).text('Sleep Movement • Skin Sensitivity • Adjustment Issues', pyramidX + 70, pyramidY + (tierHeight + tierSpacing)*3 + 28);

doc.moveDown(6);

// New Page
doc.addPage();

// Factor Hierarchy Text
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

// New Page - Questions, Choices, and Decisions
doc.addPage();

addSection('Questions, Choices, and Decision Mapping', 18, true);
doc.moveDown(0.3);
addText('This section details the exact questions asked, available answer choices, and how each choice influences the algorithm\'s decisions.', 11);
doc.moveDown(0.5);

// TIER 1 FACTORS
addSection('Tier 1: Critical Safety Factors', 16, true);

// Assistant
addText('1. Assistant (Weight: 100)', 13, true);
doc.moveDown(0.2);
addText('Question: "Do you require assistance to remove the mask in an emergency?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Yes', 10);
addBullet('No', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Yes → requiresEasyRemoval = true; Requires magnetic quick-release or easy-removal mechanism', 9);
addBullet('No → No special removal requirement', 9);
doc.moveDown(0.3);

// Eye/Reflux
addText('2. Eye/Reflux (Weight: 100)', 13, true);
doc.moveDown(0.2);
addText('Question: "Do you have eye issues or severe acid reflux that could cause aspiration?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Yes', 10);
addBullet('No', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Yes → canUseFullFace = false; CRITICAL: Must use nasal-only masks (aspiration risk)', 9);
addBullet('No → Full face masks allowed if otherwise appropriate', 9);
doc.moveDown(0.3);

// Drug
addText('3. Drug/Vomiting (Weight: 100)', 13, true);
doc.moveDown(0.2);
addText('Question: "Do you take medications that cause vomiting or nausea?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Yes', 10);
addBullet('No', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Yes → canUseFullFace = false; CRITICAL: Must use nasal-only masks (aspiration risk)', 9);
addBullet('No → Full face masks allowed if otherwise appropriate', 9);
doc.moveDown(0.3);

// Implant
addText('4. Implant (Weight: 70)', 13, true);
doc.moveDown(0.2);
addText('Question: "Do you have any medical implants (pacemaker, defibrillator, etc.)?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Yes', 10);
addBullet('No', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Yes → canUseMagnetic = false; Must use non-magnetic attachments only', 9);
addBullet('No → Magnetic attachments allowed if otherwise appropriate', 9);

// New Page
doc.addPage();

// TIER 2 FACTORS
addSection('Tier 2: Primary Mask Type Determinants', 16, true);

// Breathing Type
addText('5. Breathing Type (Weight: 95)', 13, true);
doc.moveDown(0.2);
addText('Question: "How do you primarily breathe during sleep?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Nose only', 10);
addBullet('Mouth only', 10);
addBullet('Mixed (both nose and mouth)', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Nose only → Primary: Nasal Mask/Pillows (85-90% success if no obstruction)', 9);
addBullet('Mouth only → Primary: Full Face Mask (80-85% success, if safe)', 9);
addBullet('Mixed → Full Face OR Nasal + Chin Strap (75-85% success)', 9);
doc.moveDown(0.3);

// Nasal Obstruction
addText('6. Nasal Obstruction (Weight: 90)', 13, true);
doc.moveDown(0.2);
addText('Question: "Do you have any nasal obstruction or issues?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('No obstruction', 10);
addBullet('Mild obstruction', 10);
addBullet('Severe obstruction', 10);
addBullet('Deviated septum', 10);
addBullet('Seasonal allergies', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('No obstruction → Ideal for nasal masks; no modification needed', 9);
addBullet('Mild obstruction → Consider dual approach or full face', 9);
addBullet('Severe obstruction → REQUIRES Full Face Mask (if safe)', 9);
addBullet('Deviated septum → Full Face preferred (if safe)', 9);
addBullet('Seasonal allergies → Consider heated humidifier accessory', 9);

// New Page
doc.addPage();

// TIER 3 FACTORS
addSection('Tier 3: Strong Modifier Factors', 16, true);

// Claustrophobic
addText('7. Claustrophobic (Weight: 80)', 13, true);
doc.moveDown(0.2);
addText('Question: "Do you experience claustrophobia or discomfort with things covering your face?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Yes', 10);
addBullet('No', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Yes + Nasal Mask → SWITCH to Nasal Pillows (minimal contact)', 9);
addBullet('Yes + Full Face → Select minimal-contact models (F40, F30, Amara View)', 9);
addBullet('No → No modification based on this factor', 9);
doc.moveDown(0.3);

// Facial Hair
addText('8. Facial Hair (Weight: 75)', 13, true);
doc.moveDown(0.2);
addText('Question: "Do you have facial hair (beard, mustache)?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Yes', 10);
addBullet('No', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Yes + Nasal Mask → REQUIRED switch to Nasal Pillows (traditional cushions fail to seal)', 9);
addBullet('Yes + Full Face → Select total face mask OR full face + fabric liners', 9);
addBullet('No → No modification based on this factor', 9);
doc.moveDown(0.3);

// Sleep Position
addText('9. Sleep Position (Weight: 70)', 13, true);
doc.moveDown(0.2);
addText('Question: "What is your primary sleep position?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Back', 10);
addBullet('Side', 10);
addBullet('Stomach', 10);
addBullet('Sitting upright', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Back → Any design acceptable; no tube-up requirement', 9);
addBullet('Side → REQUIRES tube-up design (top-of-head tubing for pillow compatibility)', 9);
addBullet('Stomach → REQUIRES tube-up design (top-of-head tubing for pillow compatibility)', 9);
addBullet('Sitting → May indicate underlying condition; consider medical evaluation', 9);

// New Page
doc.addPage();

// TIER 4 FACTORS
addSection('Tier 4: Moderate Modifier Factors', 16, true);

// Sleep Movement
addText('10. Sleep Movement (Weight: 60)', 13, true);
doc.moveDown(0.2);
addText('Question: "How much do you move during sleep?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Very little movement', 10);
addBullet('Some movement', 10);
addBullet('Move all the time', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Very little → Standard headgear sufficient', 9);
addBullet('Some → Standard headgear usually sufficient', 9);
addBullet('Move all the time → REQUIRES Enhanced 4-point headgear; prefer Nasal Pillows over Nasal Mask', 9);
doc.moveDown(0.3);

// Skin Sensitivity
addText('11. Skin Sensitivity (Weight: 55)', 13, true);
doc.moveDown(0.2);
addText('Question: "Do you have sensitive skin or allergies to silicone/materials?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Yes', 10);
addBullet('No', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Yes → REQUIRES gel, fabric, or memory foam cushions; hypoallergenic materials', 9);
addBullet('Yes → Prioritize: AirTouch (fabric), DreamWear Gel, or soft silicone options', 9);
addBullet('No → Standard silicone cushions acceptable', 9);
doc.moveDown(0.3);

// Adjustment Issues
addText('12. Adjustment Issues (Weight: 50)', 13, true);
doc.moveDown(0.2);
addText('Question: "Do you have difficulty adjusting straps or headgear (arthritis, dexterity issues)?"', 10, true);
doc.moveDown(0.2);
addText('Answer Choices:', 10, true);
addBullet('Yes', 10);
addBullet('No', 10);
doc.moveDown(0.2);
addText('Decision Mapping:', 10, true);
addBullet('Yes → Prefer magnetic quick-release attachments (if no implant)', 9);
addBullet('Yes → Prefer auto-adjusting or simplified designs', 9);
addBullet('No → Standard attachments acceptable', 9);

// New Page - Decision Tree Visual
doc.addPage();

addSection('Decision Tree: Primary Mask Type', 18, true);
doc.moveDown(0.3);

// Draw decision tree
const treeX = 50;
const treeY = 100;
const nodeWidth = 120;
const nodeHeight = 35;
const hSpacing = 180;
const vSpacing = 80;

// Root node
doc.rect(treeX + 200, treeY, nodeWidth, nodeHeight)
   .fillAndStroke('#667EEA', '#000000');
doc.fontSize(9).font('Helvetica-Bold').fillColor('white')
   .text('Breathing Type', treeX + 210, treeY + 5, { width: nodeWidth - 20, align: 'center' });
doc.text('+ Nasal Status', treeX + 210, treeY + 18, { width: nodeWidth - 20, align: 'center' });
doc.fillColor('black');

// Branch 1: Nose Only
doc.moveTo(treeX + 200 + nodeWidth/2, treeY + nodeHeight)
   .lineTo(treeX + 100, treeY + nodeHeight + vSpacing)
   .stroke();
doc.rect(treeX + 50, treeY + nodeHeight + vSpacing, nodeWidth, nodeHeight)
   .fillAndStroke('#4ECDC4', '#000000');
doc.fontSize(9).font('Helvetica-Bold').fillColor('white')
   .text('Nose Only', treeX + 60, treeY + nodeHeight + vSpacing + 5, { width: nodeWidth - 20, align: 'center' });
doc.text('No Obstruction', treeX + 60, treeY + nodeHeight + vSpacing + 18, { width: nodeWidth - 20, align: 'center' });
doc.fillColor('black');

// Result 1
doc.moveTo(treeX + 50 + nodeWidth/2, treeY + nodeHeight*2 + vSpacing)
   .lineTo(treeX + 50 + nodeWidth/2, treeY + nodeHeight*2 + vSpacing + 30)
   .stroke();
doc.rect(treeX + 20, treeY + nodeHeight*2 + vSpacing + 30, nodeWidth + 60, nodeHeight - 10)
   .fillAndStroke('#A8E6CF', '#000000');
doc.fontSize(8).font('Helvetica-Bold').fillColor('black')
   .text('→ Nasal Mask/Pillows', treeX + 30, treeY + nodeHeight*2 + vSpacing + 35, { width: nodeWidth + 40, align: 'center' });
doc.fontSize(7).text('85-90% Success', treeX + 30, treeY + nodeHeight*2 + vSpacing + 48, { width: nodeWidth + 40, align: 'center' });

// Branch 2: Mouth Only
doc.moveTo(treeX + 200 + nodeWidth/2, treeY + nodeHeight)
   .lineTo(treeX + 260, treeY + nodeHeight + vSpacing)
   .stroke();
doc.rect(treeX + 200, treeY + nodeHeight + vSpacing, nodeWidth, nodeHeight)
   .fillAndStroke('#FF6B6B', '#000000');
doc.fontSize(9).font('Helvetica-Bold').fillColor('white')
   .text('Mouth Only', treeX + 210, treeY + nodeHeight + vSpacing + 5, { width: nodeWidth - 20, align: 'center' });
doc.text('(if safe)', treeX + 210, treeY + nodeHeight + vSpacing + 18, { width: nodeWidth - 20, align: 'center' });
doc.fillColor('black');

// Result 2
doc.moveTo(treeX + 200 + nodeWidth/2, treeY + nodeHeight*2 + vSpacing)
   .lineTo(treeX + 200 + nodeWidth/2, treeY + nodeHeight*2 + vSpacing + 30)
   .stroke();
doc.rect(treeX + 170, treeY + nodeHeight*2 + vSpacing + 30, nodeWidth + 60, nodeHeight - 10)
   .fillAndStroke('#FFD3A5', '#000000');
doc.fontSize(8).font('Helvetica-Bold').fillColor('black')
   .text('→ Full Face Mask', treeX + 180, treeY + nodeHeight*2 + vSpacing + 35, { width: nodeWidth + 40, align: 'center' });
doc.fontSize(7).text('80-85% Success', treeX + 180, treeY + nodeHeight*2 + vSpacing + 48, { width: nodeWidth + 40, align: 'center' });

// Branch 3: Mixed
doc.moveTo(treeX + 200 + nodeWidth/2, treeY + nodeHeight)
   .lineTo(treeX + 420, treeY + nodeHeight + vSpacing)
   .stroke();
doc.rect(treeX + 350, treeY + nodeHeight + vSpacing, nodeWidth, nodeHeight)
   .fillAndStroke('#FFE66D', '#000000');
doc.fontSize(9).font('Helvetica-Bold').fillColor('black')
   .text('Mixed', treeX + 360, treeY + nodeHeight + vSpacing + 5, { width: nodeWidth - 20, align: 'center' });
doc.text('(both)', treeX + 360, treeY + nodeHeight + vSpacing + 18, { width: nodeWidth - 20, align: 'center' });

// Result 3
doc.moveTo(treeX + 350 + nodeWidth/2, treeY + nodeHeight*2 + vSpacing)
   .lineTo(treeX + 350 + nodeWidth/2, treeY + nodeHeight*2 + vSpacing + 30)
   .stroke();
doc.rect(treeX + 320, treeY + nodeHeight*2 + vSpacing + 30, nodeWidth + 60, nodeHeight - 10)
   .fillAndStroke('#95E1D3', '#000000');
doc.fontSize(8).font('Helvetica-Bold').fillColor('black')
   .text('→ Full Face OR', treeX + 330, treeY + nodeHeight*2 + vSpacing + 35, { width: nodeWidth + 40, align: 'center' });
doc.fontSize(7).text('Nasal + Chin Strap', treeX + 330, treeY + nodeHeight*2 + vSpacing + 48, { width: nodeWidth + 40, align: 'center' });
doc.fontSize(6).text('75-85% Success', treeX + 330, treeY + nodeHeight*2 + vSpacing + 58, { width: nodeWidth + 40, align: 'center' });

doc.moveDown(6);

// New Page
doc.addPage();

// Complete Decision Algorithm Text
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

