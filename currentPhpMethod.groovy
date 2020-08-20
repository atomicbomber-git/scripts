//
// A script to be used in PHPStorm's Live Template to get the PHP method where the current editor caret sits
//

// COPY AND PASTE THIS CODE SEGMENT BELOW ---- BEGIN ----

import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.fileEditor.FileEditorManager;
import com.intellij.openapi.project.ProjectManager;
import com.intellij.psi.util.PsiTreeUtil;
import com.intellij.psi.PsiDocumentManager;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiNamedElement;
import com.intellij.openapi.editor.impl.EditorImpl;
import com.jetbrains.php.lang.psi.elements.impl.MethodImpl;

// ---- END ----

def fileEditorManager = FileEditorManager.getInstance(project)
def _editor = fileEditorManager.allEditors.first().editor

// COPY AND PASTE THIS CODE SEGMENT BELOW ---- BEGIN ----

def project = ProjectManager.getInstance().openProjects.first()
def textEditor = _editor;
def document = textEditor.document;
def offset = textEditor.caretModel.offset;
def psiFile = PsiDocumentManager.getInstance(project).getPsiFile(document);
def psiElement = psiFile.findElementAt(offset);
def method = PsiTreeUtil.getParentOfType(psiElement, MethodImpl.class);
method.name;

// ---- END ----

