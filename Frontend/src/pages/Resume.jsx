// src/pages/Resume.jsx
import { useState, useEffect, useRef } from "react";
import api from "../api/axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "jspdf-autotable";
import "../styles/resume.css";

export default function Resume() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    summary: "",
    skills: "",
    experiences: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", institution: "", year: "" }],
  });

  const [savedResume, setSavedResume] = useState(null);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  
  const previewRef = useRef(null);

  // Load saved resume from backend
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get("/resume");
        if (res.data) {
          setSavedResume(res.data);
          setFormData({
            fullName: res.data.fullName || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            location: res.data.location || "",
            linkedin: res.data.linkedin || "",
            github: res.data.github || "",
            summary: res.data.summary || "",
            skills: res.data.skills?.join(", ") || "",
            experiences: res.data.experience?.length
              ? res.data.experience
              : [{ title: "", company: "", duration: "", description: "" }],
            education: res.data.education?.length
              ? res.data.education
              : [{ degree: "", institution: "", year: "" }],
          });
        }
      } catch (err) {
        console.error("Fetch resume failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  const handleChange = (e, section = null, index = null) => {
    const { name, value } = e.target;
    if (section && index !== null) {
      setFormData(prev => {
        const updated = { ...prev };
        updated[section][index] = { ...updated[section][index], [name]: value };
        return updated;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { title: "", company: "", duration: "", description: "" }],
    }));
  };

  const removeExperience = index => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "" }],
    }));
  };

  const removeEducation = index => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    setSaving(true);

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      linkedin: formData.linkedin.trim(),
      github: formData.github.trim(),
      summary: formData.summary.trim(),
      skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean),
      education: formData.education.filter(edu => edu.degree.trim() || edu.institution.trim()),
      experience: formData.experiences.filter(exp => exp.title.trim() || exp.company.trim()),
    };

    try {
      const res = await api.post("/resume", payload);
      setSavedResume(res.data);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2200);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const exportToPDF = async () => {
    if (!previewRef.current) return;
    
    setExporting(true);
    
    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: true,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;
      
      pdf.addImage(imgData, 'PNG', (pdfWidth - width) / 2, 0, width, height);
      pdf.save(`${formData.fullName.trim() || 'Resume'}.pdf`);
      
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const generatePDF = () => {
    if (!formData.fullName.trim()) {
      alert('Please enter your name before exporting');
      return;
    }
    exportToPDF();
  };

  if (loading) return <div className="loading">Loading your resume...</div>;

  const hasContent =
    formData.fullName.trim() ||
    formData.email.trim() ||
    formData.phone.trim() ||
    formData.summary.trim() ||
    formData.skills.trim() ||
    formData.experiences.some(exp => exp.title.trim() || exp.company.trim()) ||
    formData.education.some(edu => edu.degree.trim() || edu.institution.trim());

  return (
    <div className="resume-page">
      <header className="page-header">
        <h1>Resume Builder</h1>
        <p>Fill in your details to generate your professional resume</p>
        {hasContent && (
          <button 
            onClick={generatePDF} 
            className="btn-export"
            disabled={exporting}
          >
            {exporting ? 'Exporting...' : '📄 Export as PDF'}
          </button>
        )}
      </header>

      <main className="resume-layout">
        {/* Form - Left Column */}
        <section className="form-column card">
          <form onSubmit={handleSubmit}>
            <h2 className="section-title">Personal Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="THARASRI B" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="tharasribaskaran@gmail.com" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91-8610288700" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Coimbatore" />
              </div>
              <div className="form-group">
                <label>LinkedIn</label>
                <input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="www.linkedin.com/in/tharasri/" />
              </div>
              <div className="form-group">
                <label>GitHub</label>
                <input name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/Tharasri78" />
              </div>
            </div>

            <h2 className="section-title">Career Objective</h2>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={5}
              placeholder="Enter your career objective here..."
              className="summary-textarea"
            />

            <h2 className="section-title">Skills</h2>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="JavaScript, React.js, Node.js, Express.js, MongoDB, Git, Postman"
              className="skills-input"
            />
            <small>Comma separated (technical skills only)</small>

            <h2 className="section-title">Experience</h2>
            {formData.experiences.map((exp, idx) => (
              <div key={idx} className="repeatable-block">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Role</label>
                    <input name="title" value={exp.title} onChange={e => handleChange(e, "experiences", idx)} placeholder="dev" />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input name="company" value={exp.company} onChange={e => handleChange(e, "experiences", idx)} placeholder="Tech" />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input name="duration" value={exp.duration} onChange={e => handleChange(e, "experiences", idx)} placeholder="JAN 2025" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description (use bullets with •)</label>
                  <textarea
                    name="description"
                    value={exp.description}
                    onChange={e => handleChange(e, "experiences", idx)}
                    rows={4}
                    placeholder="• Results-driven frontend developer..."
                  />
                </div>
                {formData.experiences.length > 1 && (
                  <button type="button" className="btn-remove" onClick={() => removeExperience(idx)}>
                    Remove Experience
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn-add" onClick={addExperience}>
              + Add Experience
            </button>

            <h2 className="section-title">Education</h2>
            {formData.education.map((edu, idx) => (
              <div key={idx} className="repeatable-block">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Degree</label>
                    <input name="degree" value={edu.degree} onChange={e => handleChange(e, "education", idx)} placeholder="B.TECH INFORMATION TECHNOLOGY" />
                  </div>
                  <div className="form-group">
                    <label>Institution</label>
                    <input name="institution" value={edu.institution} onChange={e => handleChange(e, "education", idx)} placeholder="KGISL Institute of Technology" />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input name="year" value={edu.year} onChange={e => handleChange(e, "education", idx)} placeholder="SEP 2023 - MAY 2027" />
                  </div>
                </div>
                {formData.education.length > 1 && (
                  <button type="button" className="btn-remove" onClick={() => removeEducation(idx)}>
                    Remove Education
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn-add" onClick={addEducation}>
              + Add Education
            </button>

            <div className="form-actions">
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save Resume"}
              </button>
            </div>

            {justSaved && <div className="save-success">✓ Resume saved successfully</div>}
          </form>
        </section>

        {/* Preview - Exact PDF Style */}
        <section className="preview-column card">
          <div className="preview-header">
            <h3>Resume Preview</h3>
            {hasContent && (
              <button 
                onClick={generatePDF} 
                className="btn-preview-export"
                disabled={exporting}
              >
                {exporting ? '⏳' : '📥'}
              </button>
            )}
          </div>
          <div className="preview-content" ref={previewRef}>
            {!hasContent ? (
              <div className="empty-preview">
                <p>Fill in your details on the left to see the preview here.</p>
              </div>
            ) : (
              <>
                                <h1 className="preview-name">{formData.fullName.toUpperCase()}</h1>
                // Preview section - replace the contact part in your preview
                <div className="preview-contact">
                  {formData.phone && <span>{formData.phone}</span>}
                  {formData.email && <span> | {formData.email}</span>}
                  {formData.location && <span> | {formData.location}</span>}
                  <br />
                  {formData.linkedin && (
                    <>
                      <a 
                        href={formData.linkedin.startsWith('http') ? formData.linkedin : `https://${formData.linkedin}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="preview-link"
                      >
                        {formData.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </>
                  )}
                  {formData.github && (
                    <>
                      {formData.linkedin && " | "}
                      <a 
                        href={formData.github.startsWith('http') ? formData.github : `https://${formData.github}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="preview-link"
                      >
                        {formData.github.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </>
                  )}
                </div>
                {formData.summary.trim() && (
                  <>
                    <hr className="preview-divider" />
                    <h2 className="preview-section-title">CAREER OBJECTIVE</h2>
                    <p className="preview-summary">{formData.summary}</p>
                  </>
                )}

                {formData.education.some(e => e.degree.trim() || e.institution.trim()) && (
                  <>
                    <hr className="preview-divider" />
                    <h2 className="preview-section-title">EDUCATION</h2>
                    {formData.education.map((edu, i) => (edu.degree.trim() || edu.institution.trim()) && (
                      <div key={i} className="preview-education">
                        <div className="edu-header">
                          <strong>{edu.degree.toUpperCase()}</strong>
                          <span>{edu.year}</span>
                        </div>
                        <div className="edu-institution">{edu.institution.toUpperCase()}</div>
                      </div>
                    ))}
                  </>
                )}

                {formData.skills.trim() && (
                  <>
                    <hr className="preview-divider" />
                    <h2 className="preview-section-title">SKILLS</h2>
                    <div className="preview-skills">
                      {formData.skills.split(',').map((skill, i) => (
                        <span key={i} className="skill-tag">{skill.trim()}</span>
                      ))}
                    </div>
                  </>
                )}

                {formData.experiences.some(e => e.title.trim() || e.company.trim()) && (
                  <>
                    <hr className="preview-divider" />
                    <h2 className="preview-section-title">EXPERIENCE</h2>
                    {formData.experiences.map((exp, i) => (exp.title.trim() || exp.company.trim()) && (
                      <div key={i} className="preview-entry">
                        <div className="entry-header">
                          <strong>{exp.title.toUpperCase()}</strong>
                          <span>{exp.duration.toUpperCase()}</span>
                        </div>
                        <div className="entry-company">{exp.company.toUpperCase()}</div>
                        <div className="entry-desc">
                          {exp.description.split('\n').map((line, idx) => line.trim() && (
                            <p key={idx}> {line.trim()}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}