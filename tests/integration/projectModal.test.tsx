import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ProjectModal } from '@/components/modals/ProjectModal';
import { Project } from '@/types/project';

describe('Integração: ProjectModal', () => {
  it('não deve renderizar quando isOpen for false', () => {
    const { container } = render(
      <ProjectModal
        isOpen={false}
        onClose={vi.fn()}
        onSave={vi.fn()}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('deve preencher o nome e submeter nova pasta chamando onSave e onClose', async () => {
    const user = userEvent.setup();
    const handleSave = vi.fn();
    const handleClose = vi.fn();

    render(
      <ProjectModal
        isOpen={true}
        onClose={handleClose}
        onSave={handleSave}
      />
    );

    expect(screen.getByText('Nova Pasta de Projeto')).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/Ex: Infraestrutura, Web Apps, Ferramentas.../i);
    await user.type(input, 'Mnemosine Pro');

    const submitBtn = screen.getByRole('button', { name: /criar pasta/i });
    await user.click(submitBtn);

    expect(handleSave).toHaveBeenCalledWith('Mnemosine Pro');
    expect(handleClose).toHaveBeenCalled();
  });

  it('deve preencher dados existentes quando estiver em modo de edição', async () => {
    const existingProject: Project = {
      id: 'proj-123',
      name: 'Projeto Antigo',
      services: [],
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };

    const user = userEvent.setup();
    const handleSave = vi.fn();

    render(
      <ProjectModal
        isOpen={true}
        onClose={vi.fn()}
        project={existingProject}
        onSave={handleSave}
      />
    );

    expect(screen.getByText('Editar Pasta de Projeto')).toBeInTheDocument();
    const input = screen.getByDisplayValue('Projeto Antigo');
    expect(input).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, 'Projeto Atualizado');

    const saveBtn = screen.getByRole('button', { name: /salvar alterações/i });
    await user.click(saveBtn);

    expect(handleSave).toHaveBeenCalledWith('Projeto Atualizado');
  });

  it('deve fechar o modal ao clicar no botão Cancelar', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    render(
      <ProjectModal
        isOpen={true}
        onClose={handleClose}
        onSave={vi.fn()}
      />
    );

    const cancelBtn = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
